import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();
export const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
});
export const openai = new OpenAIApi(configuration);

export const  chatGPT = async (input: string): Promise<string> => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: input,
    max_tokens: 2048,
    n: 1,
    stop: null,
    temperature: 0.5,
  });

  const concatenatedResponses = response.data.choices
    .map((choice) => choice.text)
    .join("\n");
  return concatenatedResponses;
}