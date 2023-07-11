FROM oven/bun:0.6
WORKDIR /usr/app

COPY ./ ./
COPY .env ./
RUN bun install
CMD bun run index.ts