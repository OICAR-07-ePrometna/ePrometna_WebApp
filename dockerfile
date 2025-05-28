# ---- Build Stage ----
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL_BUILDTIME=/api
ENV VITE_API_URL=$VITE_API_URL_BUILDTIME

RUN npm run build

# ---- Serve Stage ----
FROM nginx:1.27-alpine AS server

RUN apk add --no-cache gettext

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .

COPY nginx.conf /etc/nginx/nginx.conf

COPY config.template.json /app/config.template.json
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]

