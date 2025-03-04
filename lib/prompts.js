import inquirer from "inquirer";
import fs from "fs";
import path from "path";

const templatesDir = path.join(process.cwd(), "templates");

function getTemplates(framework, language) {
  const frameworkPath = path.join(templatesDir, framework, language);

  if (fs.existsSync(frameworkPath)) {
    const availableTemplates = fs
      .readdirSync(frameworkPath)
      .map((template) => ({
        name: template,
        value: path.join(frameworkPath, template),
      }));

    return availableTemplates.length
      ? availableTemplates
      : [{ name: "Not Available", value: "" }];
  }

  return [{ name: "Not Available", value: "" }];
}

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
      name: "template",
      message: "Choose a template:",
      choices: (answers) => getTemplates(answers.framework, answers.language),
      when: (answers) => answers.framework && answers.language,
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
  ]);
}
