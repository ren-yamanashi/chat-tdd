import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { useTerminalLoading } from "../modules/terminalLoading";

dotenv.config();

export const chatGPT = async (input: string): Promise<string> => {
  const loadingStop = useTerminalLoading();
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY as string,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 2048,
      n: 1,
      stop: null,
      temperature: 0.5,
    });
    loadingStop();
    if (response.data.choices && response.data.choices.length > 0) {
      const concatenatedResponses = response.data.choices
        .map((choice) => choice.text)
        .join("\n");

      return concatenatedResponses;
    } else {
      throw new Error("No response from ChatGPT");
    }
  } catch (e) {
    loadingStop();
    throw new Error();
  }
};
