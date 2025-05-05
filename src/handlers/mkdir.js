import { mkdir as mkFolder } from "fs/promises";
import { EOL } from "os";
import { basename } from "path";
import { getPath } from "../helpers/getPath.js";
import { errorHandle } from "../helpers/errorHandler.js";

export const mkdir = async (path) => {
  try {
    const dirName = basename(path);
    await mkFolder(getPath(path), { recursive: true });
    console.log(EOL + `Folder ${dirName} created!`);
  } catch (error) {
    errorHandle(error);
  }
}
