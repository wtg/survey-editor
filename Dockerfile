FROM node:10 as build

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.15.7

COPY --from=build /dist/ /var/www/html
COPY --from=build /dist/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]