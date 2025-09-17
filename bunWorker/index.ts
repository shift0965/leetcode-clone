import { runWorker } from "./helpers/runWorker.js";

const server = Bun.serve({
  port: 3002,
  fetch(req) {
    return new Response(`Bun!`);
  },
});

runWorker();
console.log(`Listening on http://localhost:${server.port}...`);
