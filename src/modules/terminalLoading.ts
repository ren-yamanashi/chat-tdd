import readline from "readline";

export const useTerminalLoading = () => {
  const loadingSymbols = ["|", "/", "-", "\\"];
  let currentIndex = 0;

  const loadingAnimation = setInterval(() => {
    // カーソルを先頭に戻す
    readline.cursorTo(process.stdout, 0);

    // 現在のローディングシンボルを表示
    process.stdout.write(
      `${loadingSymbols[currentIndex % loadingSymbols.length]}`
    );

    // インデックスを更新
    currentIndex++;
  }, 200);

  return () => {
    clearInterval(loadingAnimation);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
  };
};
