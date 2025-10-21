# ================================================================================================================
# Stage 1: Build static website

FROM node:18-alpine AS builder
WORKDIR /app/frontend

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build 

# ================================================================================================================
# Stage 2: Serve dengan Caddy
# FROM caddy:2.10-alpine
# COPY --from=builder /app/frontend/out /usr/share/caddy
# COPY caddy/Caddyfile /etc/caddy/Caddyfile

# EXPOSE 80 443

# CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]

# ================================================================================================================
# Stage 2: Serve dengan Nginx
FROM nginx:alpine

# Hapus default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy config custom
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy hasil build static Next.js
COPY --from=builder /app/frontend/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]