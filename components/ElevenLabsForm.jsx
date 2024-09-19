"use client";
import React, { useState, useEffect } from "react";
import { generateSpeech, listVoices } from "@/utils/elevenLabs";

const ElevenLabsForm = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch available voices on component mount
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await listVoices();
        const voiceData = response.voices; // Access the 'voices' array from the response
        setVoices(voiceData);
        setSelectedVoice(voiceData[0]?.id || ""); // Automatically select the first voice if available
        console.log("Fetched Voices:", voiceData);
      } catch (error) {
        console.error("Error fetching voices", error);
      }
    };
    fetchVoices();
  }, []);

  // Handle form submit to generate speech
  const handleGenerateSpeech = async () => {
    setLoading(true);
    try {
      const audioBlob = await generateSpeech(text, selectedVoice);
    //   const audioUrl = URL.createObjectURL(audioBlob);
    console.log(audioBlob)
      setAudioSrc(audioBlob);
    } catch (error) {
      console.error("Error generating speech", error);
    } finally {
      setLoading(false);
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to speak..."
            rows="4"
            className="w-full px-4 py-2 border text-black bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="voiceSelect" className="text-black font-semibold">
            Select Voice:
          </label>
          <select
            id="voiceSelect"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="w-full px-4 py-2 border text-black bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {voices.length > 0 ? (
              voices.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name} - {voice.language}
                </option>
              ))
            ) : (
              <option>Loading voices...</option>
            )}
          </select>
        </div>

        <button
          type="button"
          onClick={handleGenerateSpeech}
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
        {audioSrc && (
          <div className="mt-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const audio = new Audio(audioSrc);
                  audio.play();
                }}
                className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Play Voice
              </button>
              <a
                href={audioSrc}
                download="speech.mp3"
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

export default ElevenLabsForm;
