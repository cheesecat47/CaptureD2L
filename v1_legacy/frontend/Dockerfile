FROM node:19-slim

WORKDIR /app

COPY . .

RUN apt-get update; npm install

CMD [ "npm", "start" ]