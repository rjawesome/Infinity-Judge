FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get install python3
RUN apt-get install g++

EXPOSE 10000
CMD [ "npm", "run", "start" ]
