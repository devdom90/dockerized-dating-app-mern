FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 80

CMD [ "npm", "start" ]