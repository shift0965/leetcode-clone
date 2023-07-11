import { runWorker } from "./helpers/runWorker.js";

const server = Bun.serve({
  port: process.env.PORT,
  fetch(req) {
    return new Response(`Bun!`);
  },
});

runWorker();
console.log(`Listening on http://localhost:${server.port}...`);
