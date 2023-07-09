FROM node:18
WORKDIR /usr/app

COPY ./ ./
COPY .env ./
RUN npm install && npm run build
CMD node dist/index.js