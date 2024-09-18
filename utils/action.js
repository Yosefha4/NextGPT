"use server";

import axios from "axios";
import { CohereClient } from "cohere-ai";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateOpenAIChatResponse = async (chatMsg) => {
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant " },
      { role: "user", content: chatMsg },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
  });
  console.log(response.choices[0].message);
  console.log(response);

  return "Chat temp response 123";
};

export const generateHuggingChatResponse = async (chatMsg) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B",
      {
        inputs: chatMsg,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
      }
    );
    console.log(response);
    const generatedText = await response.data[0].generated_text;
    console.log(generatedText);
    return "hugging text test";
  } catch (error) {
    console.log(error.message || "Error generating chat response");
  }
};

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
// export const generateCohereChatResponse = async (chatMsg) => {
//   const response = await cohere.chat.generate({
//     messages: [
//       { role: "system", content: "You are a helpful assistant" },
//       { role: "user", content: chatMsg },
//     ],
//     model: "command-xlarge-2022-12",
//     temperature: 0,
//   });
//   console.log(response);

//   return response.generations[0].text;
// };
