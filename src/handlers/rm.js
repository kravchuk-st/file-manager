import { unlink } from "fs/promises";
import { EOL } from "os";
import { basename } from "path";
import { getPath } from "../helpers/getPath.js";
import { errorHandle } from "../helpers/errorHandler.js";

export const rm = async (path) => {
  try {
    const filename = basename(path);
    await unlink(getPath(path));
    console.log(EOL + `File ${filename} removed!`);
  } catch (error) {
    errorHandle(error);
  }
};
