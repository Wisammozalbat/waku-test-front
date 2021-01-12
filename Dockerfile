FROM node:12.2.0-alpine as client

WORKDIR /app

ENV PATH /app/noe_modules/.bin:$PATH

COPY ./package*.json /app/

RUN npm install --silent

RUN npm install react-scripts -g --silent

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=client /app/build/ /var/www/html

COPY ./nginx/default.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]