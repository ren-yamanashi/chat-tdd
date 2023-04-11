import { runTDD } from "./application";


const [command, filePath] = process.argv.slice(2);

if (!command) {
  console.error("Error: No arguments provided.");
  process.exit(1);
}

if (command === "run-tdd") {
  runTDD(filePath);
} else {
  console.error(`Error: Unknown command "${command}"`);
  process.exit(1);
}
