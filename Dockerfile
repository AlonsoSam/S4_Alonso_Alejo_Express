FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm config set strict-ssl false

RUN npm install

COPY . .

EXPOSE 9000
CMD ["node", "app.js"]