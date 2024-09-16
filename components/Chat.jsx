"use client";

import { useState } from "react";

const Chat = () => {
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(textInput);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">messages</h2>
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
