import fs from "fs-extra";
import chalk from "chalk";
import path from "path";

export async function setupProject(answers) {
  const { projectName, template } = answers;
  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red("❌ Project folder already exists. Aborting."));
    process.exit(1);
  }

  if (!template) {
    console.log(chalk.red("❌ No template found. Aborting."));
    process.exit(1);
  }

  fs.copySync(template, targetDir);
  console.log(chalk.green(`✅ Project created successfully in ${projectName}`));
  console.log(chalk.blue(`\n👉 Next steps:`));
  console.log(`  cd ${projectName}`);
  console.log(`  ${answers.packageManager} install`);
  console.log(`  ${answers.packageManager} run dev`);
}
