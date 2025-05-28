#!/bin/sh
set -e

echo "[WebApp Entrypoint] Initializing Nginx reverse proxy..."

if [ -z "${BACKEND_URL}" ]; then
	echo "[WebApp Entrypoint] ERROR: BACKEND_URL environment variable is not set."
	echo "[WebApp Entrypoint] This should be the base URL for your backend (e.g., http://server:8090)."
	exit 1
fi

echo "[WebApp Entrypoint] BACKEND_URL is: ${BACKEND_URL}"

TEMPLATE_NGINX_CONF="/etc/nginx/conf.d/default.conf.template"
FINAL_NGINX_CONF="/etc/nginx/conf.d/default.conf"

echo "[WebApp Entrypoint] Generating Nginx configuration from template..."
envsubst '${BACKEND_URL}' <"${TEMPLATE_NGINX_CONF}" >"${FINAL_NGINX_CONF}"

echo "[WebApp Entrypoint] --- Generated ${FINAL_NGINX_CONF} ---"
cat "${FINAL_NGINX_CONF}"
echo "[WebApp Entrypoint] --- End of Nginx configuration ---"

echo "[WebApp Entrypoint] Validating generated Nginx configuration..."
nginx -t # Validates /etc/nginx/nginx.conf which should include default.conf

echo "[WebApp Entrypoint] Nginx configuration is valid. Starting Nginx..."
exec "$@" # Executes CMD from Dockerfile (nginx -g "daemon off;")
