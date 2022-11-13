FROM node:19.0-buster-slim

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . . 

RUN npx prisma generate

# RUN npx prisma migrate dev

RUN npx tsc

CMD ["npm", "start"]

EXPOSE 3000
