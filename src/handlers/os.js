import { arch, cpus, EOL, homedir, userInfo } from "os";
import { errorHandle } from "../helpers/errorHandler.js";

export const osInfo = (flag) => {
  try {
    switch (flag.replace()) {
      case "--EOL":
        console.log(EOL + `End-Of-Line: ${JSON.stringify(EOL)}`);
        break;
      case "--cpus":
        let processor = cpus();
        const cpuInfo = processor.map((c) => ({
          Model: c.model,
          "Clock rate": `${(c.speed / 1000).toFixed(2)} GHz`,
        }));
        console.log(EOL + `CPUS count: ${processor.length}`);
        console.table(cpuInfo);
        break;
      case "--homedir":
        console.log(EOL + `Home directory: ${homedir()}`);
        break;
      case "--username":
        const { username } = userInfo();
        console.log(EOL + `Current user name: ${username}`);
        break;
      case "--architecture":
        console.log(EOL + `CPU architecture: ${arch()}`);
        break;
      default:
        break;
    }
  } catch (error) {
    errorHandle(error);
  }
};
