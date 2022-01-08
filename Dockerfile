# FRONTEND - NODE
FROM node:14 as FRONTEND
WORKDIR /usr/share/nginx/
COPY package* yarn.lock ./
RUN yarn install --silent --no-optional

COPY public ./public
COPY resources ./resources
COPY webpack.mix.js tailwind.config.js ./
RUN yarn run prod


# BACKEND - NGINX + PHP + COMPOSER
FROM wyveo/nginx-php-fpm:latest as BACKEND
COPY --from=FRONTEND /usr/share/nginx /usr/share/nginx

RUN apt-get update
RUN apt-get install  --no-install-recommends --no-install-suggests -q -y php8.0-sqlite3

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN usermod -a -G www-data nginx

WORKDIR /usr/share/nginx/
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-scripts

COPY .env.example ./.env

COPY . .

RUN composer du
RUN touch /usr/share/nginx/database/database.sqlite

RUN chown -R nginx:nginx .
RUN chmod +x artisan
RUN php artisan migrate --force