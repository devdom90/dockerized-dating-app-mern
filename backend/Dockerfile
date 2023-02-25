FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm run build

#################################################

FROM nginx:ltx as prod-stage

COPY --from=build-stage /app/build usr/nginx/html

EXPOSE 80

CMD [ "npm", "start" ]