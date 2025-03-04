import inquirer from "inquirer";

export async function promptUser() {
  return await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is your project name?",
      default: "my-app",
    },
    {
      type: "list",
      name: "framework",
      message: "Which framework do you want to use?",
      choices: ["React", "Next.js"],
    },
    {
      type: "list",
      name: "language",
      message: "JavaScript or TypeScript?",
      choices: ["JavaScript", "TypeScript"],
    },
    {
      type: "list",
      name: "cssFramework",
      message: "Which CSS framework?",
      choices: ["ShadCN", "NextUI", "MUI"],
    },
    {
      type: "list",
      name: "packageManager",
      message: "Choose a package manager:",
      choices: ["npm", "yarn", "pnpm", "bun"],
    },
    {
      type: "confirm",
      name: "installDeps",
      message: "Would you like to install dependencies now?",
      default: true,
    },
    // {
    //   type: "confirm",
    //   name: "initGit",
    //   message: "Initialize Git repository?",
    //   default: true,
    // },
  ]);
}
