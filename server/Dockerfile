FROM node:16

RUN apt-get update
RUN apt-get install python3
RUN apt-get install g++
RUN apt-get install -y asciidoc
RUN apt-get install libcap-dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir programs
RUN git clone https://github.com/ioi/isolate.git
WORKDIR /usr/src/app/isolate
RUN make isolate
RUN make
RUN make all
RUN make install

WORKDIR /usr/src/app
COPY . .

EXPOSE 10000
CMD [ "npm", "run", "start" ]