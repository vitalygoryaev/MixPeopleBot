FROM node:latest

ENV NODE_ENV production
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app