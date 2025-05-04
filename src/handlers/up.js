import { chdir, cwd } from "process";
import { parse } from "path";

export const up = () => {
  if (parse(cwd()).root === cwd()) {
    console.error("You are in root derectory!");
  }

  chdir("../");
};
