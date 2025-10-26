# FROM node:lts-alpine
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . .
# EXPOSE 5137
# CMD ["npm", "run", "dev"]


# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./ 
RUN npm install

COPY . .
EXPOSE 5173

CMD ["npm", "run", "dev"]
