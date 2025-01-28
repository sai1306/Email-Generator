import { BaseLLM } from "langchain/llms";
import axios from "axios";

const GEMINI_API_URL = "https://gemini.googleapis.com/v1beta3/models/text:generate"; // Replace with the correct endpoint

class GeminiLLM extends BaseLLM {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
  }

  async _call(prompt, options) {
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };

    const body = {
      prompt: {
        text: prompt,
      },
      // Include other required parameters for Gemini
    };

    try {
      const response = await axios.post(GEMINI_API_URL, body, { headers });
      return response.data.text; // Adjust based on the API response
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error("Failed to generate text using Gemini.");
    }
  }

  _llmType() {
    return "gemini";
  }
}

export default GeminiLLM;
