FROM oven/bun
WORKDIR /usr/app

COPY ./ ./
COPY .env ./
RUN bun install
CMD bun run index.ts