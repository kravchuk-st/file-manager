import { Transform } from "stream";
import { cwd } from "process";
import { EOL } from "os";
import { up, cd, ls } from './handlers/index.js';
import { errorHandle } from './helpers/errorHandler.js';

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
        case 'ls':
          ls();
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
