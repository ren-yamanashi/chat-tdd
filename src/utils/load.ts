export const createLoading = (
  cursorToBeginning: () => void,
  clearCurrentLine: () => void
) => {
  const loadingSymbols = ["|", "/", "-", "\\"];
  let currentIndex = 0;

  const load = async <T>(asyncFunc: () => Promise<T>): Promise<T> => {
    const start = setInterval(() => {
      cursorToBeginning();
      process.stdout.write(
        `${loadingSymbols[currentIndex % loadingSymbols.length]}`
      );
      currentIndex++;
    }, 200);

    const res = await asyncFunc();
    clearInterval(start);
    clearCurrentLine();

    return res;
  };
  return {
    load,
  };
};
