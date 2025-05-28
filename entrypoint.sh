#!/bin/sh
set -e

echo "[WebApp Entrypoint] Initializing for direct API calls..."

CONFIG_TEMPLATE_FILE="/app/config.template.json"
CONFIG_OUTPUT_FILE="/usr/share/nginx/html/config.json" # Served by Nginx

if [ -z "${RUNTIME_VITE_API_URL}" ]; then
	echo "[WebApp Entrypoint] ERROR: RUNTIME_VITE_API_URL environment variable is not set."
	echo "[WebApp Entrypoint] This should be the full base URL for your backend API (e.g., http://app:8090/api)."
	exit 1
fi

echo "[WebApp Entrypoint] RUNTIME_VITE_API_URL is: ${RUNTIME_VITE_API_URL}"
echo "[WebApp Entrypoint] Generating ${CONFIG_OUTPUT_FILE} from ${CONFIG_TEMPLATE_FILE}..."

# Substitute RUNTIME_VITE_API_URL into the template
envsubst '${RUNTIME_VITE_API_URL}' <"${CONFIG_TEMPLATE_FILE}" >"${CONFIG_OUTPUT_FILE}"

echo "[WebApp Entrypoint] --- Generated ${CONFIG_OUTPUT_FILE} ---"
cat "${CONFIG_OUTPUT_FILE}"
echo "[WebApp Entrypoint] --- End of ${CONFIG_OUTPUT_FILE} ---"

echo "[WebApp Entrypoint] Validating Nginx configuration..."
# Use the final nginx.conf directly, not a template for nginx itself in this scenario
nginx -t -c /etc/nginx/nginx.conf
# The 'nginx -t' command will print errors to stderr and exit with a non-zero code if invalid.
# Since 'set -e' is active, the script will exit here if nginx -t fails.

echo "[WebApp Entrypoint] Nginx configuration is valid."
echo "[WebApp Entrypoint] Starting Nginx..."

# Execute the command passed as arguments to this script (CMD from Dockerfile)
exec "$@"
