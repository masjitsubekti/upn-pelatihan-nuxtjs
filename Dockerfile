FROM node:16.17.1-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install --save --legacy-peer-deps
RUN npm run build

EXPOSE 31111

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=31111

CMD [ "npm", "run", "prod_upn" ]