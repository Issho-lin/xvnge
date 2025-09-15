FROM nginx:1.18.0
USER root
COPY dist /usr/share/nginx/dist
COPY nginx.conf /etc/nginx/nginx.conf
COPY server.conf /etc/nginx/conf.d/default.conf
RUN  ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && usermod -u 1000 nginx && groupmod -g 1000 nginx \
  && chown -R nginx:nginx /usr/share/nginx /etc/nginx /var/cache/nginx /var/log/nginx
USER nginx