# Test Image
FROM node:lts-alpine as builder
LABEL maintainer "santiagohernanjardon@gmail.com"

WORKDIR /app
COPY package.json package-lock.json ./

RUN mkdir data
# RUN set -x && npm --production=false

COPY . .

RUN npm install --omit=dev

# Production Image
FROM node:lts-alpine as main
LABEL maintainer "santiagohernanjardon@gmail.com"

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
EXPOSE 3000

COPY package.json package-lock.json ./
RUN touch .env

RUN mkdir data
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start:prod"]