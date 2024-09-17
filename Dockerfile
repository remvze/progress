FROM docker.io/node:20-alpine3.18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM docker.io/caddy:latest
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /var/www/html

EXPOSE 8080
