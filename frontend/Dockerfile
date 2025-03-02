FROM node:23.6.0

WORKDIR /app

COPY ./package*.json .

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]
