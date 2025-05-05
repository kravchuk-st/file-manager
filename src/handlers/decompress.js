import path, { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createUnzip } from "zlib";
import { errorHandle } from "../helpers/errorHandler.js";

export const decompress = async (pathToFile, pathToDestination) => {
  try {
    let newFilePath, newFileName;

    if (!pathToDestination) {
      newFilePath = path.dirname(pathToFile);
    } else {
      newFilePath = pathToDestination;
    }

    let FileName = path.basename(pathToFile);
    if (FileName.endsWith(".br")) {
      newFileName = FileName.slice(0, -3);
    }

    const pathNewFile = resolve(newFilePath, newFileName);

    const inp = createReadStream(pathToFile);
    const out = createWriteStream(pathNewFile);

    await pipeline(inp, createUnzip(), out);
    console.log(`File decompressed to "${pathNewFile}"`);
  } catch (error) {
    errorHandle(error);
  }
};
