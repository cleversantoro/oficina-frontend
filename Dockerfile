FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .

ARG BUILD_CONFIG=production
RUN npm run build
#-- --configuration=${BUILD_CONFIG}

FROM nginx:1.27-alpine AS runtime

ARG DIST_DIR=dist/oficina/browser
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/${DIST_DIR} /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf && \
    printf 'server {\n\
  listen 80;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
  # Assets estáticos com cache leve (ajuste se quiser)\n\
  location ~* \\.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {\n\
    expires 7d;\n\
    add_header Cache-Control "public, max-age=604800";\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
