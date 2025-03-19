import inquirer from "inquirer";
import fs from "fs";
import path from "path";

const templatesDir = path.join(process.cwd(), "./templates");

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getFrameworks() {
  return fs.existsSync(templatesDir)
    ? fs
        .readdirSync(templatesDir)
        .filter((dir) =>
          fs.statSync(path.join(templatesDir, dir)).isDirectory()
        )
    : [];
}

// Function to dynamically get languages based on the selected framework
function getLanguages(framework) {
  const frameworkPath = path.join(templatesDir, framework);
  return fs.existsSync(frameworkPath)
    ? fs
        .readdirSync(frameworkPath)
        .filter((dir) =>
          fs.statSync(path.join(frameworkPath, dir)).isDirectory()
        )
    : [];
}

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
  const frameworks = getFrameworks();

  if (frameworks.length === 0) {
    console.log("❌ No frameworks found in the templates directory!");
    process.exit(1);
  }

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
      choices: frameworks.map(formatName),
    },
    {
      type: "list",
      name: "language",
      message: "JavaScript or TypeScript?",
      choices: (answers) => getLanguages(answers.framework).map(formatName),
      when: (answers) => answers.framework,
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
    // {
    //   type: "confirm",
    //   name: "installDeps",
    //   message: "Would you like to install dependencies now?",
    //   default: true,
    // },
  ]);
}
