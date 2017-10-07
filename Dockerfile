FROM mhart/alpine-node:8.6.0

RUN mkdir -p /server
WORKDIR /server

COPY package-lock.json /server/
COPY package.json /server/

RUN npm install
COPY *.js ./
COPY server-setup/ ./server-setup
COPY config/ ./config
COPY api/ ./api

EXPOSE 3010

CMD [ "npm", "docker-start" ]