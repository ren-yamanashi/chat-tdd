export const useLoad = (
  cursorToBeginning: () => void,
  clearCurrentLine: () => void
) => {
  const loadingSymbols = ["|", "/", "-", "\\"];
  let currentIndex = 0;

  const start = () =>
    setInterval(() => {
      // カーソルを先頭に戻す
      cursorToBeginning();

      // 現在のローディングシンボルを表示
      process.stdout.write(
        `${loadingSymbols[currentIndex % loadingSymbols.length]}`
      );

      // インデックスを更新
      currentIndex++;
    }, 200);

  const stop = (loading: NodeJS.Timer) => {
    clearInterval(loading);
    clearCurrentLine();
  };
  return {
    start,
    stop,
  };
};
