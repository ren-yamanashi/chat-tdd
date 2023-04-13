import { container } from "src/container";
import { safeExecute } from "../../utils/safeExecute";
import { API } from "src/interfaces/api";
export const generateProgramCode = async (
  load: <T>(asyncFunc: () => Promise<T>) => Promise<T>,
  contents: string
) => {
  const generateAnswer =
    container.resolve<API["generateAnswer"]>("generateAnswer");
  const { response, error } = await safeExecute<string | Error>(() =>
    load<string | Error>(() => generateAnswer(contents))
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
