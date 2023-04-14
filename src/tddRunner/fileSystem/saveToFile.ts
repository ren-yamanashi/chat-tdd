import { safeExecute } from "../../utils/safeExecute";
import { container } from "src/container";
import { FileSystem } from "src/interfaces/fileSystem";
import { Path } from "src/interfaces/path";

/**
 * 指定されたディレクトリに指定されたディレクトリ名とその内容を保存する
 * @param outputDirectoryPath 保存先のディレクトリパス
 * @param fileInfo ファイルの情報 `ファイル名:中身` のオブジェクト
 */
export const saveToFile = async (
  outputDirectoryPath: string,
  fileInfo: { [fileName: string]: string }
): Promise<void> => {
  const fs = container.resolve<FileSystem>("fs");
  const path = container.resolve<Path>("path");

  for (const fileName of Object.keys(fileInfo)) {
    const filePath = path.join(outputDirectoryPath, fileName);
    const { error } = await safeExecute<void>(() =>
      fs.writeFile(filePath, fileInfo[fileName])
    );

    if (error) {
      console.error(error);
      process.exit(1);
    }

    console.log(`Response saved to file: ${filePath}`);
  }
};
