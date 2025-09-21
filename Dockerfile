# Base stage
FROM node:18 AS base
WORKDIR /usr/app

# Frontend development stage
FROM base AS frontend-dev
CMD cd frontend && npm install && npm run dev

# Backend development stage
FROM base AS backend-dev
CMD cd backend && npm install && npm run dev

# Production stage
FROM base AS production

COPY frontend/ frontend/
RUN cd frontend && npm install && npm run build

COPY backend/ backend/
RUN cd backend && npm install && npm run build

COPY frontend/dist frontend/dist

CMD cd backend && npm run start