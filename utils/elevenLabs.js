"use server"

// utils/elevenLabs.js

import { ElevenLabsClient, play, stream } from "elevenlabs";

// Initialize the ElevenLabs client
const client = new ElevenLabsClient({
  apiKey: "sk_8e6f5e696a8776caba2b809a08ca4d1defb549c1dc4d7041", // Replace with your ElevenLabs API key
});

// Function to generate speech
export const generateSpeech = async (text, voice) => {
  try {
    const audio = await client.generate({
        stream: true,
        voice: "Rachel",
        text: text,
        model_id: "eleven_multilingual_v2"
      });
    console.log(audio)
    await play(audio);
    return audio; // Ensure this returns the correct audio data
  } catch (error) {
    console.error("Error generating speech", error);
    throw error;
  }
};

// Function to list available voices
export const listVoices = async () => {
  try {
    const voices = await client.voices.getAll();
    return voices;
  } catch (error) {
    console.error("Error fetching voices", error);
    throw error;
  }
};
