FROM node:10.6.0-alpine

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet
RUN npm i -g serve

COPY . .

RUN NODE_ENV=production npm run build
