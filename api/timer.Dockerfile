FROM node:20-alpine

WORKDIR /usr/app

COPY package.json .

RUN npm i

COPY . .

RUN npm run generate
RUN npm run build:timer
