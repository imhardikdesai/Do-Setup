import { execSync } from "child_process";
import chalk from "chalk";

export async function installDependencies(projectName, packageManager) {
  console.log(chalk.yellow("\n📦 Installing dependencies..."));
  try {
    execSync(`${packageManager} install`, {
      cwd: projectName,
      stdio: "inherit",
    });
    console.log(chalk.green("✅ Dependencies installed successfully!\n"));
  } catch (error) {
    console.log(chalk.red("❌ Failed to install dependencies."));
  }
}
