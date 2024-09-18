"use client";

import { generateOpenAIChatResponse, generateHuggingChatResponse, generateCohereChatResponse } from "@/utils/action";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Chat = () => {
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState([]);

  // const { mutate } = useMutation({
  //   mutationFn: (message) => generateCohereChatResponse(message),
  // });

  const { mutate } = useMutation({
    mutationFn: async (message) => {
      const response = await generateCohereChatResponse(message);
      console.log(response);
      return response; // Return the response for use in the success callback
    },
    onSuccess: (response) => {
      setMessages((prev) => [
        ...prev,
        { role: "USER", message: textInput },
        { role: "CHATBOT", message: response }, // Ensure to use the response text
      ]);
      setTextInput("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(textInput);
    console.log(textInput);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">messages</h2>
        <div className="mt-4 py-2">
          {messages?.map((msg, index) => (
            <div key={index} className={`message ${msg.role ? " border-b border-dashed border-gray-300" : ""} mt-2 `}>
              <strong>{msg.role === "USER" ? "You: " : "Bot: "}</strong>
              {msg.message}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message NextGPT"
            className="input input-bordered join-item w-full"
            value={textInput}
            required
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button className="btn btn-primary join-item " type="submit">
            Ask question
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
