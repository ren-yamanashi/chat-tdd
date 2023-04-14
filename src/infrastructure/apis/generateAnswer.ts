import dotenv from "dotenv";
import { OpenAIApi, Configuration } from "openai";
import { safeExecute } from "../../utils/safeExecute";
import { isIncludeMessage } from "src/utils/typeCheck";
import { API } from "src/interfaces/api";
import { container } from "src/container";
dotenv.config();

/**
 * GPTに回答を要求
 * @param prompt プロンプト
 * @returns GPTからの回答
 */
export const generateAnswer: API["generateAnswer"] = async (
  prompt: string
): Promise<string | Error> => {
  // TODO: 実行するときに、KEYを指定するように変更
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
    if (isIncludeMessage(error)) return new Error(error.message);
  }

  const concatenatedResponses = response.data.choices
    .map((choice) => choice.text)
    .join("\n");

  return concatenatedResponses;
};

container.register("API", { generateAnswer });
