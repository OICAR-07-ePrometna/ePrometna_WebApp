
# ---- Build Stage ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL_BUILDTIME=/api
ENV VITE_API_URL=$VITE_API_URL_BUILDTIME # Vue app will make calls to /api
RUN npm run build

# ---- Serve Stage ----
FROM nginx:1.27-alpine AS server
RUN apk add --no-cache gettext bash
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template # Nginx template
COPY entrypoint.sh /app/entrypoint.sh # Entrypoint script
RUN chmod +x /app/entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
