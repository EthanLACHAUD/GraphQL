FROM node:14
WORKDIR /app
RUN npm install --production
RUN npm install express
RUN npm install graphql
RUN npm install graphql-http
COPY . .

EXPOSE 8080

CMD ["node", "api.js"]
