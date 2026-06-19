import { spawn } from "node:child_process";

const isWorker =
  process.env.SERVICE_ROLE === "worker" ||
  process.env.RAILWAY_SERVICE_NAME === "kinsclub-worker" ||
  process.env.RAILWAY_SERVICE_ID === "8c495583-2634-4016-ab0e-d69048a26c1a";

const [command, args] = isWorker
  ? ["npm", ["run", "worker"]]
  : ["next", ["start", "-H", "0.0.0.0", "-p", process.env.PORT || "3000"]];

const child = spawn(command, args, { stdio: "inherit", shell: false });

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
