import { container } from "src/container";
import { safeExecute } from "../../utils/safeExecute";
import { API } from "src/interfaces/api";

/**
 * プロンプトに従ったプログラムコードの生成
 * @param prompt (required)
 * @param load (option): ローディング処理
 */
export const generateProgramCode = async (
  prompt: string,
  load?: <T>(asyncFunc: () => Promise<T>) => Promise<T>
): Promise<string> => {
  const API = container.resolve<API>("API");

  const { response, error } = await safeExecute<string | Error>(() =>
    load
      ? load<string | Error>(() => API.generateAnswer(prompt))
      : API.generateAnswer(prompt)
  );

  if (!response) {
    console.error("program code is not defined");
    process.exit(1);
  }
  if (response instanceof Error) {
    console.error(response);
    process.exit(1);
  }
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log("[Code]\n", response);

  return response;
};
