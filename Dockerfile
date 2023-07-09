FROM node:18
WORKDIR /usr/app
COPY frontend/ frontend/
COPY frontend/.env frontend/
RUN cd frontend && npm install && npm run build

COPY backend/ backend/
COPY backend/.env backend/
RUN cd backend && npm install && npm run build

CMD cd backend && node dist/index.js