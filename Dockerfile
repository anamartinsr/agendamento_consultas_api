FROM node:20-bullseye

WORKDIR /usr/src/api_scheduling

COPY package*.json ./

RUN npm ci 

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]