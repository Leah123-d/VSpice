import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";
import crypto from "crypto";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

dotenv.config();

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAcessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAcessKey,
  },
  region: bucketRegion,
});

const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

export const uploadImage = async (req, res) => {
  console.log("Upload route hit 🚀");

  try {
    if (!req.file) {
      return res.status(400).json({ error: "no file uploaded" });
    }

    const buffer = await sharp(req.file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    const params = {
      Bucket: bucketName,
      Key: randomImageName(),
      Body: buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    res.json({
      message: "file uploaded successfully",
      filename: params.Key,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("upload failed");
  }
};

export const analyzeImage = async (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res.status(400).json({ error: "no file uploaded" });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: filename,
    });

    const signedURL = await getSignedUrl(s3, command, { expires: 60 });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please analyze this spice photo and extract the following fields in strict JSON format:- name (string), - brand (string), 
                      - full_weight in grams (number), 
                      - current_weight in grams (number; estimate based on visible spice amount in the jar), 
                      - expiration_date (string in YYYY-MM-DD or null), 
                      - last_purchased (string in YYYY-MM-DD or null). 
                      Assume the spice jar is approximately 2 inches in diameter and 5 inches tall. Use visual cues such as fill level and container size to estimate current_weight. If any info is missing or unreadable, use null. No extra text, no explanation—just the JSON object.`,
            },
            {
              type: "image_url",
              image_url: {
                url: signedURL,
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
