import path, { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { access } from "fs/promises";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";
import { errorHandle } from "../helpers/errorHandler.js";

export const compress = async (pathToFile, pathToDestination) => {
  try {
    let newFilename;

    if (!pathToDestination) {
      newFilename = path.dirname(pathToFile);
    } else {
      newFilename = resolve(pathToDestination);
    }

    const pathNewFile = resolve(newFilename, `${path.basename(pathToFile)}.br`);

    await access(resolve(pathToFile));

    const readStream = createReadStream(pathToFile, { encoding: "utf-8" });
    const writeStream = createWriteStream(pathNewFile);

    await pipeline(readStream, createGzip(), writeStream);

    console.log(`File compressed to "${pathNewFile}"`);
  } catch (error) {
    errorHandle(error);
  }
};
