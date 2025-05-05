import { rename } from "fs/promises";
import { EOL } from "os";
import { basename } from "path";
import { getPath } from "../helpers/getPath.js";
import { errorHandle } from "../helpers/errorHandler.js";

export const rn = async (path, newName) => {
  try {
    if (!path) console.error("Invalid input: enter path to file");
    if (!newName) console.error("Invalid input: enter new file name");

    const fileName = basename(path);

    let newPath = path.replace(fileName, newName);
    newPath = getPath(newPath);

    await rename(getPath(path), newPath);

    console.log(EOL + `File ${fileName} renamed to ${newName}`);
  } catch (error) {
    errorHandle(error);
  }
};
