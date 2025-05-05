import { createReadStream, createWriteStream } from "fs";
import { EOL } from "os";
import { basename, join } from "path";
import { getPath } from "../helpers/getPath.js";
import { errorHandle } from "../helpers/errorHandler.js";

export const cp = async (currPath, newPath) => {
  try {
    return new Promise((resolve, reject) => {
      if (!currPath) console.error("Invalid input: enter path to file");
      if (!newPath) console.error("Invalid input: enter path to new file");
  
      const filename = basename(currPath);
      const newFile = join(newPath, filename);
  
      const readStream = createReadStream(getPath(currPath));
      const writeStream = createWriteStream(getPath(newFile));
  
      const copy = readStream.pipe(writeStream);
  
      copy.on("finish", () => {
        console.log(EOL + `File ${filename} copied!`);
        resolve();
      });
  
      copy.on("error", (e) => reject(e));
      readStream.on("error", (e) => reject(e));
    });
  } catch (error) {
    errorHandle(error);
  }
}
