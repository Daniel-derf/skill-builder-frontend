# Estágio de build
FROM node:16 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para a imagem
COPY . .

# Compila o projeto Vite (o resultado será armazenado em /app/dist)
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copia os arquivos estáticos para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expondo a porta
EXPOSE 80

# Comando padrão do Nginx para manter o container em execução
CMD ["nginx", "-g", "daemon off;"]
