FROM node:14.13-slim

WORKDIR /

COPY . .

RUN npm install --production && npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
