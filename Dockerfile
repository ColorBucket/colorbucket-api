FROM node:boron

MAINTAINER Gabriel Age <0800.grc@gmail.com>

ARG NODE=production
ENV NODE_ENV ${NODE}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY dist/ /usr/src/app/

RUN npm install --production

EXPOSE 3003

ENTRYPOINT ["node", "server.js"]