# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./

# or: RUN npm install
RUN npm ci
COPY . .
RUN npm run build

# ---- Serve Stage ----
# Use a lightweight Nginx image to serve the built static files
FROM nginx:1.27-alpine AS server
WORKDIR /usr/share/nginx/html

# Remove the default Nginx welcome page
RUN rm -rf ./*
# Copy the built application from the 'builder' stage to Nginx's web root directory
COPY --from=builder /app/dist .

# Copy the custom Nginx configuration file
# This file should be in the same directory as the Dockerfile
# or you need to adjust the path.
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Start Nginx and keep it in the foreground
# The 'daemon off;' directive is important for Docker containers,
# as it prevents Nginx from daemonizing and causing the container to exit.
CMD ["nginx", "-g", "daemon off;"]
