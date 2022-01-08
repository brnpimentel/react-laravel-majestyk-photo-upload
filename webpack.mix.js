const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js').react();

mix.sass('resources/scss/app.scss', 'public/css')
    .options({
        postCss: [require("tailwindcss")]
    });


 mix.browserSync({
        proxy: 'localhost:8080', 
        port: 3000, 
        open: false,
    });