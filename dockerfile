# Test Image
FROM node:lts-alpine as builder
LABEL maintainer "santiagohernanjardon@gmail.com"

WORKDIR /app
COPY package.json package-lock.json ./

RUN mkdir data
# RUN set -x && npm --production=false
RUN npm install --omit=dev

COPY . .

RUN npm run build

# Production Image
FROM node:lts-alpine as main
LABEL maintainer "santiagohernanjardon@gmail.com"

ARG POSTGRES_CA_CERT_CONTENT
ARG POSTGRES_CA_CERT

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
EXPOSE 3000

COPY package.json package-lock.json ./
# RUN touch .env

RUN mkdir data
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

RUN touch ${POSTGRES_CA_CERT}
RUN echo ${POSTGRES_CA_CERT_CONTENT} >> ${POSTGRES_CA_CERT}

CMD ["npm", "run", "start:prod"]