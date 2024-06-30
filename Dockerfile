FROM node:18-alpine AS build

ARG VITE_WITHDRAWAL_COMMISSION
ARG VITE_ALLOWED_CHATROOMS
ARG VITE_APP_DOMAIN
ARG VITE_BTC_TO_BITS
ARG VITE_API_URL
ARG VITE_WEBSOCKETS_URL
ARG VITE_MIN_WITHDRAWAL_VALUE_IN_RUSH
ARG VITE_ENV

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

FROM nginx:stable-alpine as serve
COPY --from=build /app/dist /usr/share/nginx/html
COPY /deploy/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
