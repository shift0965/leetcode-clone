FROM node:18
WORKDIR /usr/app

COPY ./ ./
RUN npm install && npm run build
CMD npm run start