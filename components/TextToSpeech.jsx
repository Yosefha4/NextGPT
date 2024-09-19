"use client";
import { useState } from "react";
import { speakText } from "@/utils/textToSpeech"; // Import utility functions

const TextToSpeech = () => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const handleSpeak = async () => {
    if (textInput.trim() === "") {
      alert("Please enter some text.");
      return;
    }
    setLoading(true);
    try {
      const url = await speakText(textInput);
      setAudioURL(url); // Set the URL for playback and download
      console.log(url)
      console.log("audioURL: ", audioURL);
      setLoading(false);
    } catch (error) {
      alert("Error synthesizing speech: " + error.message);
    } finally {
      setLoading(false); // Ensure loading state is reset even if there's an error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-4 text-primary">
          Text-to-Speech
        </h1>
        <p className="text-center text-black mb-6">
          Enter text and let AI speak it out for you!
        </p>

        {/* Form */}
        <div className="mb-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text to speak..."
            rows="4"
            className="w-full px-4 py-2 border text-black bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleSpeak}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Speak Text
        </button>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-purple-500 border-t-transparent"></div>
          </div>
        )}

        {/* Voice Playback and Download Section */}
        {audioURL && (
          <div className="mt-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const audio = new Audio(audioURL);
                  audio.play();
                }}
                className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Play Voice
              </button>
              <a
                href={audioURL}
                download="speech.wav"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Download Voice
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSpeech;
