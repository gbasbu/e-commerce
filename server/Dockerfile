FROM node:14.15.4

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY ./ /app/

EXPOSE 5000

CMD [ "node", "/app/app.js" ]