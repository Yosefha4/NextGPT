"use client";

import { generateCohereChatResponse } from "@/utils/action";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import TypewriterEffect from "./TypewriterEffect";

const Chat = () => {
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const { mutate } = useMutation({
  //   mutationFn: (message) => generateCohereChatResponse(message),
  // });

  const { mutate } = useMutation({
    mutationFn: async (message) => {
      const response = await generateCohereChatResponse(message);
      return response;
    },
    onMutate: () => {
      // Add the user's message and a loading placeholder for the AI's response
      setMessages((prev) => [
        ...prev,
        { role: "USER", message: textInput },
        { role: "CHATBOT", message: <AiOutlineLoading3Quarters /> }, // Placeholder for loading spinner
      ]);
      setTextInput(""); // Clear the input field after the message is sent
      setIsLoading(true);
    },
    onSuccess: (response) => {
      // Replace the loading placeholder with the actual AI response
      setMessages((prev) => prev.map((msg, index) => (index === prev.length - 1 ? { ...msg, message: response } : msg)));
      setIsLoading(false);
    },
    onError: () => {
      // Handle the case of an error (replace the loading with an error message)
      setMessages((prev) =>
        prev.map((msg, index) => (index === prev.length - 1 ? { ...msg, message: "Error fetching response" } : msg))
      );
      setIsLoading(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(textInput);
    console.log(textInput);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto] max-w-5xl">
      <div className="flex-grow overflow-y-auto space-y-4 p-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">Chat</h2>
        {messages?.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "USER" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 rounded-2xl shadow-md ${
                msg.role !== "USER" ? "bg-primary text-black" : "bg-gray-200 text-info-content"
              }`}
            >
              <strong className="border-b border-dashed border-black text-base-900">
                {msg.role === "USER" ? "You: " : "AI: "}
              </strong>
              {/* <p className="mt-1">{msg.message}</p> */}
              <p className="mt-1">
                {msg.role === "USER" ? (
                  msg.message
                ) : (
                  <TypewriterEffect
                    key={index}
                    message={msg.message}
                    speed={20} // Adjust speed as necessary
                  />
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="max-w-5xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message NextGPT"
            className="input input-bordered join-item w-full"
            value={textInput}
            required
            onChange={(e) => setTextInput(e.target.value)}
            disabled={isLoading}
          />
          <button className="btn btn-primary join-item " type="submit" disabled={isLoading}>
            Ask question
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
