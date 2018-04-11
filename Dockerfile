FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . ./

ARG CIRCLE_TOKEN
RUN npm run build

ENV CIRCLE_TOKEN ''
ENV PORT 3000
EXPOSE 3000

CMD [ "npm", "run", "proxy" ]
