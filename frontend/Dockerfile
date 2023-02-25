FROM node:lts-alpine as build-stage

WORKDIR /frontend

ADD ./package.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as prod-build
COPY --from=build-stage /frontend/build /usr/share/nginx/html
EXPOSE 82

CMD [ "nginx", "-g", "daemon off;" ]