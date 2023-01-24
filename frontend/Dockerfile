FROM node:latest

WORKDIR /app

ADD ./package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]