
# # ---- Build Stage ----
# FROM node:lts-alpine as builder

# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build

# # ---- Production Stage ----
# FROM nginx:alpine

# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=builder /app/dist /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy project
COPY . .

# Build the Vite app
RUN npm run build

# Install lightweight static server
RUN npm install -g serve

# Start the static server
CMD ["serve", "-s", "dist", "-l", "3000"]

EXPOSE 3000






