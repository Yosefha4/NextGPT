"use server";

import { CohereClient } from "cohere-ai";
import { HfInference } from "@huggingface/inference";

const HF_TOKEN = process.env.HUGGIN_FACE_API_KEY;

const inference = new HfInference(HF_TOKEN);

// Generate Image
const adjustToNearestMultipleOf8 = (value) => {
  return Math.round(value / 8) * 8;
};

export const generateImage = async ({ description, model, height, width, guidanceScale }) => {
  try {
    const adjustedHeight = adjustToNearestMultipleOf8(height);
    const adjustedWidth = adjustToNearestMultipleOf8(width);

    console.log({ description, model, adjustedHeight, adjustedWidth, guidanceScale });
    const response = await inference.textToImage({
      model: model, // animation
      // model: 'runwayml/stable-diffusion-v1-5',
      inputs: description,
      parameters: {
        negative_prompt: "blurry",
        num_inference_steps: 50,
        guidance_scale: guidanceScale,
        width: adjustedWidth,
        height: adjustedHeight,
      },
    });
    console.log(response);
    // Convert Blob to ArrayBuffer, then to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    // Return the base64 image with proper data URL
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error("Error generating image:", error);
    return null; // Handle the error appropriately
  }
};

// Generate text (Chat)
export const generateCohereChatResponse = async (chatMsg) => {
  console.log(chatMsg);
  try {
    const cohere = new CohereClient({
      token: process.env.COHERE_API_KEY,
    });

    const chatRes = await cohere.chat({
      model: "command",
      message: chatMsg,
    });
    console.log(chatRes.text);
    return chatRes.text;
  } catch (error) {
    console.log(error);
  }
};
