FROM node:lts-alpine

WORKDIR /backend

COPY package.json .

RUN npm install

EXPOSE 80

CMD [ "npm", "start" ]