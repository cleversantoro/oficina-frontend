# ====== STAGE 1: BUILD ======
FROM node:22-alpine AS build
WORKDIR /app

# Copia só manifests primeiro p/ cache eficiente
COPY package*.json ./
RUN npm ci

# Copia o restante do código
COPY . .

# Permite escolher a configuração do ng build (padrão: production)
ARG BUILD_CONFIG=production
# Dica: se seu package.json tiver "build": "ng build", isso basta:
RUN npm run build -- --configuration=${BUILD_CONFIG}

# ====== STAGE 2: RUNTIME (NGINX) ======
FROM nginx:1.27-alpine AS runtime

# Ajuste este ARG se o nome do projeto no dist for outro
# Angular 17+ costuma gerar: dist/<ProjectName>/browser
ARG DIST_DIR=dist/OficinaWeb/browser

# Limpa página padrão e copia artefatos do Angular
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/${DIST_DIR} /usr/share/nginx/html

# Substitui a conf padrão para suportar SPA (refresh/rotas -> index.html)
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
