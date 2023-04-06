import dotenv from "dotenv";
import { OpenAIApi, Configuration } from "openai";
dotenv.config();

// TODO: DI
export const generateAnswer = async (
  prompt: string
): Promise<string> => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY as string,
    });
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 2048,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    if (!response?.data?.choices || !response.data.choices.length) {
      throw new Error("No response");
    }

    const concatenatedResponses = response.data.choices
      .map((choice) => choice.text)
      .join("\n");

    return concatenatedResponses;
  } catch (error:any) {
    // FIXME: throwやめる
    throw new Error(error);
  }
};
