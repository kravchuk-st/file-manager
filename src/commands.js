import { Transform } from "stream";
import { cwd } from "process";
import { EOL } from "os";
import { up, cd, ls, cat, add, mkdir, rn, cp, mv, rm, osInfo, hash } from "./handlers/index.js";
import { errorHandle } from "./helpers/errorHandler.js";

export const commands = new Transform({
  async transform(chunk, encoding, callback) {
    const [command, ...args] = chunk.toString().replace(EOL, "").split(" ");

    try {
      switch (command) {
        case ".exit":
          process.exit();
        case "up":
          up();
          break;
        case "cd":
          cd(...args);
          break;
        case "ls":
          ls();
          break;
        case "cat":
          await cat(...args);
          break;
        case "add":
          await add(...args);
          break;
        case "mkdir":
          await mkdir(...args);
          break;
        case "rn":
          await rn(...args);
          break;
        case "cp":
          await cp(...args);
          break;
        case "mv":
          await mv(...args);
          break;
        case "rm":
          await rm(...args);
          break;
        case "os":
          args.forEach((i) => {
            osInfo(i);
          });
          break;
        case "hash":
          await hash(...args);
          break;
        default:
          console.error(EOL + `Invalid input: unsupported command ${command}`);
      }
    } catch (e) {
      errorHandle(e);
    }

    console.log(`${EOL}You are currently in ${cwd()}`);
    callback();
  },
});
