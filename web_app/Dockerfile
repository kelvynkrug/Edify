FROM node:16-alpine

RUN mkdir -p /usr/src/web_app
WORKDIR /usr/src/web_app

COPY . /usr/src/web_app/
RUN yarn install

EXPOSE 5252

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5252

CMD [ "yarn", "dev" ]
