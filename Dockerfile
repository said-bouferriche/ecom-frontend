#stage 1
FROM node:14.21.1-alpine AS build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

FROM nginx as runtime
COPY --from=build /app/dist/ecom-pro-front /usr/share/nginx/html



#FROM node:14.21.1-alpine AS build
#WORKDIR /usr/src/app
#COPY package.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#### STAGE 2: Run ###
#FROM nginx:1.17.1-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /usr/src/app/dist/aston-villa-app /usr/share/nginx/html
