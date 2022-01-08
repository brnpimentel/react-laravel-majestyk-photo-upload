## Majestyk Photo Upload - @brnpimentel

- Docker
- Laravel 8.x
- MySQL 5.7.x
- PHP 8.x 
- ReactJS 17.x
- SCSS + TailwindCSS 3.x


# Install
```
git clone https://github.com/brnpimentel/react-laravel-majestyk-photo-upload
cd react-laravel-majestyk-photo-upload
cp .env.example .env
composer install
yarn install
docker-compose up -d
```

After composer is up, run the migrations for the database
```
docker-compose exec laravel-app php artisan migrate
```

Open [http://localhost:8080](http://localhost:8080)