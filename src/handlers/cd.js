import { lstat } from "fs/promises";
import { chdir, cwd } from "process";

export const cd = async (path) => {
  if (!path) {
    console.error("Invalid input: please write path url!");
  }
  const prevPath = cwd();

  try {
    chdir(path);
    await lstat(cwd());
  } catch (e) {
    chdir(prevPath);
    console.error(`No such directory: ${path}`);
  }
};
