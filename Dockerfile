FROM node:14
COPY ./ /app
WORKDIR /app
RUN npm install --silent --registry=https://registry.npm.taobao.org
RUN NODE_ENV=production npm run build


FROM nginx
RUN mkdir -p /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

# Timezone
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' > /etc/timezone
