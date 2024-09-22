"use client";

import { generateImage } from "@/utils/action";
import { generateImagePrompt, generateNewTour } from "@/utils/tour";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Tour = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [tourDetails, setTourDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [tourImage, setTourImage] = useState(null);

  const { mutate: generateTour } = useMutation({
    mutationFn: async ({ country, city }) => {
      const response = await generateNewTour(country, city);

      console.log(response);
      return response;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (response) => {
      const parsedData = JSON.parse(response);
      setTourDetails(parsedData.tour);
      console.log("Parsaed Tour Data:", parsedData.tour); // Log the fetched data
      setIsLoading(false);
      // generateImageMutation.mutate({ country, city, place: tourDetails.stops[0] });
      // generateImageMutation(country, city, tourDetails.stops[0]);
    },
    onError: () => {
      setTourDetails(null);
      setIsLoading(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    generateTour({ country, city });
  };

  // const { mutate: generateImageMutation } = useMutation({
  //   mutationFn: async ({ country, city, places }) => {
  //     const place = places[0]; // Select a place dynamically
  //     const prompt = generateImagePrompt(country, city, place); // Use your function to generate the prompt
  //     const imageResponse = await generateImage(prompt); // Call your image generation API
  //     return imageResponse; // Ensure this returns the image URL or data
  //   },
  //   onSuccess: (imageResponse) => {
  //     imageResponse; // Assuming imageResponse is the image URL
  //   },
  //   onError: () => {
  //     setTourImage(null); // Handle error
  //   },
  // });

  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center p-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-primary">Plan Your New Tour</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter Country"
          className="input input-bordered w-full p-2"
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Enter City"
          className="input input-bordered w-full p-2"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
        />
        <button className="btn btn-primary w-full" type="submit" disabled={isLoading}>
          Generate Tour
        </button>
      </form>

      {isLoading && <p className="mt-4">Loading tour details...</p>}

      {tourDetails && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-4 w-full max-w-lg">
          <h3 className="text-2xl  mb-2">
            <strong>Country : </strong> {tourDetails.country}
          </h3>
          <h3 className="text-2xl  mb-2">
            {" "}
            <strong>City : </strong> {tourDetails.city}
          </h3>
          <p className="text-lg mb-4">{tourDetails.description}</p>
          <h4 className="text-xl font-semibold mb-2">Stops:</h4>
          <ul className="list-disc list-inside mb-4">
            {tourDetails?.stops.map((stop, index) => (
              <li key={index} className="mb-1">
                {stop}
              </li>
            ))}
          </ul>
          <p className="text-md font-medium">
            Location: {tourDetails.city}, {tourDetails.country}
          </p>
        </div>
      )}
      {/* {tourImage && <img src={tourImage} alt={`Tour in ${tourDetails.city}`} className="mt-4 w-full h-auto rounded" />} */}
    </div>
  );
};

export default Tour;
