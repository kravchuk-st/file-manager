import { readFile } from "fs/promises";
import { resolve } from "path";
import { createHash } from "crypto";
import { EOL } from "os";
import { errorHandle } from "../helpers/errorHandler.js";

export const hash = async (path) => {
  try {
    const pathToFile = resolve(path);
    const fileContent = await readFile(pathToFile, "utf8");
    const hash = createHash("sha256").update(fileContent).digest("hex");

    console.log(EOL + hash);
  } catch (error) {
    errorHandle(error);
  }
};
