const fs = require("fs");
const { execSync } = require("child_process");

const commitSha = execSync("git rev-parse HEAD").toString().trim();
const version = require("../package.json").version;

const envFile = ".env.local";

let content = fs.existsSync(envFile) ? fs.readFileSync(envFile, "utf-8") : "";

content = content
    .split("\n")
    .filter((line) => !line.startsWith("NEXT_PUBLIC_COMMIT_SHA=") && !line.startsWith("NEXT_PUBLIC_APP_VERSION="))
    .join("\n")
    .trim();

content += `

NEXT_PUBLIC_COMMIT_SHA=${commitSha}
NEXT_PUBLIC_APP_VERSION=${version}
`;

fs.writeFileSync(envFile, content.trim() + "\n");

console.log("✅ Build info updated!");
