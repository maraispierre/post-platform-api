FROM node:12.18.4-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn run build

FROM node:12.18.4-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

CMD [ "yarn", "run", "start:prod" ]