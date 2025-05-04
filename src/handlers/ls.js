import { readdir } from "fs/promises";
import { cwd } from "process";
import { EOL } from "os";
import { getPath } from "../helpers/getPath.js";

export const ls = async (dirname = "") => {
  const uri = dirname ? getPath(dirname) : cwd();
  const list = [];

  let folderItems = await readdir(uri, { withFileTypes: true });
  folderItems.forEach((item) => {
    if (item.isFile()) {
      list.push({ Name: item.name, Type: 'file' });
    } else {
      list.push({ Name: item.name, Type: 'directory' });
    }
  });

  const sortedList = list.sort((a, b) => {
    if (a.Type === b.Type) {
      return a.Name.localeCompare(b.Name);
    } else if (a.Type === 'directory') {
      return -1;
    } else {
      return 1;
    }
  });

  if (sortedList.length === 0) {
    console.error(EOL + "This directory is empty");
  }
  
  console.table(sortedList);
};
