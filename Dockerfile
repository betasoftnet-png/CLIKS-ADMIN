# Stage 1: Build the Vite React application
FROM node:20-alpine AS builder

WORKDIR /app

# Vite build-time environment variable
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Build production files
RUN npm run build


# Stage 2: Serve the production build with Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# Custom Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy Vite production build
COPY --from=builder /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
