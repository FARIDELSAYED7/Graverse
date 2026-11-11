import { spawn, spawnSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const BASE_URL = "http://localhost:3100";
const env = { ...process.env, GRAVERSE_DIST_DIR: ".next-prod" };

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env,
    ...options,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("\n1/5 Typecheck");
run("npm", ["run", "typecheck"]);

console.log("\n2/5 Lint");
run("npm", ["run", "lint"]);

console.log("\n3/5 Data validation");
run("npm", ["run", "validate"]);

console.log("\n4/5 Data tests");
run("npm", ["run", "test:data"]);

console.log("\n5/5 Production build");
run("npm", ["run", "build"]);

console.log("\nStarting production server for browser checks…");
const server = spawn("npm", ["run", "start", "--", "-p", "3100"], {
  stdio: "inherit",
  env,
  detached: false,
});

async function waitForServer() {
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${BASE_URL}/`, { redirect: "manual" });
      if (response.status < 500) return;
    } catch {
      // Not ready yet.
    }
    await sleep(500);
  }
  throw new Error("Production server did not become ready within 60s");
}

function stopServer() {
  if (!server.killed) {
    server.kill("SIGTERM");
  }
}

process.on("SIGINT", () => {
  stopServer();
  process.exit(130);
});
process.on("SIGTERM", () => {
  stopServer();
  process.exit(143);
});

try {
  await waitForServer();
  console.log("\nRunning smoke, redirect and axe checks…");
  run("node", ["scripts/smoke.mjs"], {
    env: { ...env, BASE_URL },
  });
  console.log("\nVerification passed.");
} finally {
  stopServer();
}
