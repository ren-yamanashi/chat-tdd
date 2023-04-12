import dotenv from "dotenv";
import { OpenAIApi, Configuration } from "openai";
import { safeExecute } from "../../utils/safeExecute";
dotenv.config();

// TODO: DI
export const generateAnswer = async (
  prompt: string
): Promise<string | Error> => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY as string,
  });
  const openai = new OpenAIApi(configuration);

  const { response, error } = await safeExecute(() =>
    openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 2048,
      n: 1,
      stop: null,
      temperature: 0.5,
    })
  );

  if (!response?.data?.choices || !response.data.choices.length) {
    return new Error("response is not defined");
  }
  if (error) {
    console.error(error);
    if (
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
    ) {
      return new Error((error as { message: string }).message);
    }
  }

  const concatenatedResponses = response.data.choices
    .map((choice) => choice.text)
    .join("\n");

  return concatenatedResponses;
};
