#!/usr/bin/env node

import chalk from "chalk";
import { promptUser } from "../lib/prompts.js";
import { setupProject } from "../lib/setupProject.js";
// import { installDependencies } from "../lib/installDeps.js";

async function main() {
  console.log(chalk.green("\n🚀 Welcome to Create My App CLI!\n"));

  const answers = await promptUser();
  await setupProject(answers);

  // if (answers.installDeps) {
  //   await installDependencies(answers.projectName, answers.packageManager);
  // }

  console.log(chalk.green("\n✅ Setup complete! Happy coding! 🚀"));
}

main();
