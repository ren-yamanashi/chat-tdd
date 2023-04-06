import { $commander } from "./plugins/commander";
import { runTDD } from "./application/runTdd";

const program = new $commander.Command();
program.version("0.0.1");
program
  .command("run-tdd <filePath>", { isDefault: true })
  .description("Run TDD based on the selected markdown file")
  .action(runTDD);

program.parse(process.argv);
