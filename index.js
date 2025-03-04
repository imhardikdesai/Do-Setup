#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs-extra";
import chalk from "chalk";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatesDir = path.join(__dirname, "templates");

async function main() {
  console.log(chalk.green("🚀 Welcome to Create My App!"));

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Which framework do you want to use?",
      choices: ["React", "Next.js"],
    },
    {
      type: "list",
      name: "cssFramework",
      message: "Which CSS framework?",
      choices: ["ShadCN", "NextUI", "MUI", "Tailwind"],
    },
    {
      type: "list",
      name: "language",
      message: "JavaScript or TypeScript?",
      choices: ["JavaScript", "TypeScript"],
    },
  ]);

  const projectName = "my-app";
  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red("❌ Project folder already exists. Aborting."));
    process.exit(1);
  }

  const templatePath = path.join(
    templatesDir,
    `${answers.framework
      .toLowerCase()
      .replace(".", "")}-${answers.language.toLowerCase()}`
  );

  fs.copySync(templatePath, targetDir);

  console.log(chalk.green(`✅ Project created successfully in ${projectName}`));
  console.log(chalk.blue(`\n👉 Next steps:`));
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  npm run dev`);
}

main();
