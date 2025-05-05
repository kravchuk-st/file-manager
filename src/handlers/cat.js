import { createReadStream } from "fs";
import { EOL } from "os";
import { getPath } from "../helpers/getPath.js";
import { errorHandle } from "../helpers/errorHandler.js";

export const cat = (path) => {
  try {
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(getPath(path));
  
      readStream.on("data", (chunk) => {
        console.log(EOL + chunk.toString());
        resolve();
      });
  
      readStream.on("error", (e) => reject(e));
    });
  } catch (error) {
    errorHandle(error);
  }
}
