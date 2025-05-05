import { createWriteStream } from "fs";
import { EOL } from "os";
import { basename } from "path";
import { getPath } from "../helpers/getPath.js";
import { errorHandle } from "../helpers/errorHandler.js";

export const add = (path) => {
  try {
    return new Promise((resolve, reject) => {
      const fileName = basename(path);
      const writeStream = createWriteStream(getPath(path));
  
      writeStream.on("error", (e) => reject(e));
  
      writeStream.on("finish", () => {
        console.log(EOL + `File ${fileName} created!`);
        resolve();
      });
  
      writeStream.close();
    });
  } catch (error) {
    errorHandle(error);
  }
}
