## Majestyk Photo Upload - @brnpimentel

- Docker
- Laravel 8.x
- SQLite
- PHP 8.x 
- ReactJS 17.x
- SCSS + TailwindCSS 3.x


# Install


```
git clone https://github.com/brnpimentel/react-laravel-majestyk-photo-upload
cd react-laravel-majestyk-photo-upload
```

There are 2 options for installation:

- Develop way  (you install all the packages at your machine and Docker mount the directory - will be mirrored - *better to see the uploaded images in real time)

```
cp .env.example .env
touch database/database.sqlite
composer install
yarn install
php artisan migrate
docker-compose --file docker-compose-dev.yaml up --build 
```

- Docker way (the files are clone to docker, all the installs happen inside the container. the files is not mirrored)
```
docker-compose up --build
```

Open [http://localhost:8080](http://localhost:8080)
