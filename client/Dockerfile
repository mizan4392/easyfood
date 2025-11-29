# # ---- Build Stage ----
# FROM node:lts-alpine  as builder

# WORKDIR /app

# # Install dependencies first (better caching)
# COPY package.json package-lock.json ./
# RUN npm install --legacy-peer-deps

# # Copy the rest of the app
# COPY . .

# # Build the Vite project
# RUN npm run build

# # ---- Production Stage ----
# FROM nginx:alpine

# # Remove default nginx static assets
# RUN rm -rf /usr/share/nginx/html/*

# # Copy built assets from builder
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]


# ---- Build Stage ----
FROM node:lts-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]






