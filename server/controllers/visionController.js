import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";

import { S3Client } from '@aws-sdk/client-s3'

dotenv.config();

const bucketName= process.env.BUCKET_NAME;
const bucketRegion= process.env.BUCKET_REGION;
const accessKey= process.env.ACCESS_KEY;
const secretAcessKey= process.env.SECRET_ACCESS_KEY;

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

export const uploadImage = async (req, res) => {
  console.log("Upload route hit 🚀");
  try {
    if (!req.file) {
      return res.status(400).json({ error: "no file uploaded" });
    }
    console.log("uploaded file info:", req.file.buffer);

    res.json({
      message: "file uploaded successfully",
      path: req.file.path,
      filename: req.file.filename,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("upload failed");
  }
};

export const analyzeImage = async (req, res) => {
  console.log("request body", req.body);
  const { imagePath } = req.body;

  if (!imagePath) {
    return res.status(400).json({ error: "no file uploaded" });
  }

  try {
    const base64Image = fs.readFileSync(imagePath, "base64");
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this spice photo and extract the following fields in strict JSON format: name (string), brand (string), full_weight in grams (number), current_weight (number), expiration_date (string in YYYY-MM-DD or null), last_purchased (string in YYYY-MM-DD or null). If any info is missing or unreadable, use null. No extra text, no explanation—just the JSON object.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: "low",
              },
            },
          ],
        },
      ],
    });

    const rawContent = response.choices[0].message.content;

    // Clean any markdown-style JSON block
    const cleanedJson = rawContent.replace(/```json|```/g, "").trim();

    const jsonResponse = JSON.parse(cleanedJson);
    res.json(jsonResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing vision request");
  }
};
