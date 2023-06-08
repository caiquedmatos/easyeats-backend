FROM node:18-alpine

LABEL version="1.0"

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY src /usr/app/

EXPOSE 3000

CMD [ "npm", "start" ]