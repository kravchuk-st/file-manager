import { cwd } from "process";
import { isAbsolute, join } from "path";

export const getPath = (path) => {
  return isAbsolute(path) ? path : join(cwd(), path);
};
