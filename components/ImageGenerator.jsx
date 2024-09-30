"use client";
import { generateImage } from "@/utils/action";
import { useState } from "react";

const ImageGenerator = () => {
  const [textInput, setTextInput] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("stabilityai/stable-diffusion-2");
  const [height, setHeight] = useState(512);
  const [width, setWidth] = useState(512);
  const [guidanceScale, setGuidanceScale] = useState(7.5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedImage(null);

    const image = await generateImage({
      description: textInput,
      model: selectedModel,
      height,
      width,
      guidanceScale,
    });
    if (image) {
      setGeneratedImage(image);
    }
    setLoading(false);
    setTextInput("");
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = "generated-image.png"; // Default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 opacity-55">
      <p className="absolute text-red-500 text-9xl">SOON</p>
      <div className="max-w-3xl w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-4 text-primary">AI Image Generator</h1>
        <p className="text-center text-gray-700 mb-6">Enter a text description and let AI create an amazing image for you!</p>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Prompt Input */}
          <div className="mb-6">
            <label htmlFor="prompt" className="block text-gray-700 font-medium mb-2 text-lg">
              Description
            </label>
            <textarea
              id="prompt"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter a detailed description..."
              rows="4"
              className="w-full px-4 py-2 border text-black bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Model Selection */}
          <div className="mb-4">
            <label htmlFor="model" className="block text-gray-700 font-medium mb-2">
              Select Model:
            </label>
            <select
              id="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-4 py-2 border text-black bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="stabilityai/stable-diffusion-2">Stable Diffusion 2</option>
              <option value="runwayml/stable-diffusion-v1-5">Stable Diffusion v1.5</option>
            </select>
          </div>

          {/* Parameters */}
          <div className="mb-6">
            <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
              <div className="mb-4 md:mb-0 w-full">
                <label htmlFor="height" className="block text-gray-700 font-medium mb-2">
                  Height (px):
                </label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min="256"
                  className="w-full px-4 py-2 border text-black bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="w-full">
                <label htmlFor="width" className="block text-gray-700 font-medium mb-2">
                  Width (px):
                </label>
                <input
                  type="number"
                  id="width"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  min="256"
                  className="w-full px-4 py-2 border text-black bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <label htmlFor="guidanceScale" className="block text-gray-700 font-medium mb-2">
              Guidance Scale:
            </label>
            <input
              type="number"
              id="guidanceScale"
              value={guidanceScale}
              onChange={(e) => setGuidanceScale(Number(e.target.value))}
              step="0.1"
              min="1"
              className="w-full px-4 py-2 border text-black bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            disabled
            // disabled={loading}
          >
            Generate Image
          </button>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-purple-500 border-t-transparent"></div>
          </div>
        )}

        {/* Generated Image */}
        {generatedImage && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Generated Image:</h2>
            <img src={generatedImage} alt="Generated" className="rounded-lg shadow-lg mx-auto w-full h-auto mb-4" />
            <button
              onClick={handleDownload}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
