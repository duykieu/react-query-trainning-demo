FROM node:12

WORKDIR /app

RUN npm install -g lerna tsdx cross-env

COPY package*.json ./

RUN yarn

COPY . .

RUN lerna bootstrap

RUN yarn

RUN yarn build:lib

RUN yarn build:inlano:web

EXPOSE 3001

CMD ["yarn", "start:inlano:web"]
