// auto-push.js
import { execSync } from "child_process";
import fs from "fs";

const repoName = "my-repo"; // your local folder name
const githubUrl = "https://github.com/yourusername/my-repo.git"; // replace with your repo URL

// Create folder if it doesn't exist
if (!fs.existsSync(repoName)) {
  fs.mkdirSync(repoName);
  console.log(`📁 Created folder: ${repoName}`);
}

// Change working directory
process.chdir(repoName);

// Initialize git repo if not already
if (!fs.existsSync(".git")) {
  execSync("git init", { stdio: "inherit" });
  execSync(`git remote add origin ${githubUrl}`, { stdio: "inherit" });
  console.log("✅ Git initialized and remote connected.");
} else {
  console.log("⚙️ Git already initialized.");
}

// Create a test file (optional)
if (!fs.existsSync("README.md")) {
  fs.writeFileSync("README.md", `# ${repoName}\nCreated automatically via script.`);
  console.log("📝 Created README.md");
}

// Commit & push
try {
  execSync("git add .", { stdio: "inherit" });
  execSync('git commit -m "Auto initial commit"', { stdio: "inherit" });
  execSync("git branch -M main", { stdio: "inherit" });
  execSync("git push -u origin main", { stdio: "inherit" });
  console.log("🚀 Pushed to GitHub successfully!");
} catch (error) {
  console.error("⚠️ Push failed. Check if authentication is set up.");
}
