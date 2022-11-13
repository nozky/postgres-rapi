FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . . 

RUN npx prisma migrate dev

RUN npx prisma generate

RUN npx tsc

CMD ["npm", "start"]

EXPOSE 3000
