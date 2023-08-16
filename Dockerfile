FROM node:18-alpine3.17 as development
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run migrate
RUN npm run build

FROM node:18-alpine3.17 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --only=production
RUN npm run build
RUN npm start