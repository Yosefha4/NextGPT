import { CohereClient } from "cohere-ai";

export const generateNewTour = async (city, country) => {
  const query = `Find a exact ${city} in this exact ${country}.
    If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
    Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
    {
      "tour": {
        "city": "${city}",
        "country": "${country}",
        "title": "title of the tour",
        "description": "short description of the city and tour",
        "stops": [" stop name", "stop name","stop name"]
      }
    }
    "stops" property should include only three stops.
    If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
  try {
    const cohere = new CohereClient({
      token: "LxwSK2MvDM6o0aLnZH73VIFdcZmD70j5ieVQfImD",
      //   token: process.env.COHERE_API_KEY,
    });

    const chatRes = await cohere.chat({
      model: "command",
      message: query,
    });
    console.log(chatRes);
    console.log(chatRes.text);
    return chatRes.text;
  } catch (error) {
    console.log(error);
  }
};

export const generateImagePrompt = (country, city, place) => {
  return `Generate a stunning, high-quality image that captures the essence of ${place} in ${city}, ${country}. The image should highlight key features of ${place}, including its unique architecture, natural surroundings, and cultural elements. Ensure to convey the vibrant atmosphere and the distinctive characteristics of ${place} while incorporating hints of the surrounding area to showcase the overall charm of ${city}.`;
};
