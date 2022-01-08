FROM wyveo/nginx-php-fpm:latest as BACKEND
COPY nginx.conf /etc/nginx/conf.d/default.conf
