import { cp } from './cp.js';
import { unlink } from "fs/promises";
import { EOL } from "os";
import { basename } from "path";
import { getPath } from "../helpers/getPath.js";
import { errorHandle } from "../helpers/errorHandler.js";

export const mv = async (currPath, newPath) => {
  try {
    if (!currPath) console.error("Invalid input: enter path to file");
    if (!newPath) console.error("Invalid input: enter path to new file");

    const filename = basename(currPath);

    await cp(currPath, newPath);
    await unlink(getPath(currPath));

    console.log(EOL + `File ${filename} moved to ${getPath(newPath)}`);
  } catch (error) {
    errorHandle(error);
  }
};
