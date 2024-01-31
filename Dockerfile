FROM node:20.11.0-alpine3.19

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
