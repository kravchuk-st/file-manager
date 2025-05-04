import { argv, chdir, cwd, env, exit } from "process";
import { EOL, homedir } from "os";
import { commands } from "./commands.js";

try {
  const args = Object.fromEntries(argv.slice(2).map((el) => el.split('=')));
  env.username = args['--username'] || 'User';
} catch (e) {
  console.log("Please enter your username before use file manager!");
  exit();
}

chdir(homedir());

console.log(`Welcome to the File Manager, ${env.username}!`);
console.log(EOL + `You are currently in ${cwd()}`);

process.stdin.pipe(commands).pipe(process.stdout);

const exitEvents = ["exit", "close", "SIGINT"];

exitEvents.forEach((i) => {
  process.on(i, (err) => {
    if (i === "SIGINT") {
      exit();
    }
    console.log(EOL + `Thank you for using File Manager, ${env.username}!`);
  });
});
