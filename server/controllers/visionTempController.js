import dbConnection from '../db-connection.js';

import fs from "fs";
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const imagePath = "/Users/leahputlek/Techtonica/01finalproject/VSpice/server/pumpkinSpice.jpeg"
const base64Image = fs.readFileSync(imagePath, "base64");


const openai = new OpenAI({
  apiKey: process.env.APIKEY,
});

export const analyzeImage = async (req, res) => {
  // const { image } = req.body;

  // if(!image){
  //   return res.status(400).json({error: "image is required"});
  // }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this spice photo and extract the following fields in strict JSON format: brand (string), total_grams_full (number), expiration_date (string in YYYY-MM-DD or null), estimated_grams_remaining (number). If any info is missing or unreadable, use null. No extra text, no explanation—just the JSON object."
            },
            {
              type:"image_url",
                "image_url": {
                  // "mime": "image/jpeg",
                  url: `data:image/jpeg;base64,${base64Image}`,
                  detail: "low"
                },
            },
          ]
        }
      ]
    });

    const rawContent = response.choices[0].message.content;

    // Clean any markdown-style JSON block
    const cleanedJson = rawContent.replace(/```json|```/g, '').trim();
    
    const jsonResponse = JSON.parse(cleanedJson);
    res.json(jsonResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing vision request");
  }
}