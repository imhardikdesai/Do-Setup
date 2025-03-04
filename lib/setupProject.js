import fs from "fs-extra";
import chalk from "chalk";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatesDir = path.join(__dirname, "../templates");

export async function setupProject(answers) {
  const { projectName, framework, language, initGit } = answers;
  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red("❌ Project folder already exists. Aborting."));
    process.exit(1);
  }

  const templatePath = path.join(
    templatesDir,
    `${framework.toLowerCase().replace(".", "")}-${language.toLowerCase()}`
  );

  fs.copySync(templatePath, targetDir);
  console.log(chalk.green(`✅ Project created successfully in ${projectName}`));

  // Initialize Git if user chooses
  if (initGit) {
    execSync("git init", { cwd: targetDir, stdio: "inherit" });
    console.log(chalk.blue("📌 Initialized Git repository."));
  }

  console.log(chalk.blue(`\n👉 Next steps:`));
  console.log(`  cd ${projectName}`);
  console.log(`  ${answers.packageManager} install`);
  console.log(`  ${answers.packageManager} run dev`);
}
