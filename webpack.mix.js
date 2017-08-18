const mix = require('laravel-mix');

mix.options({
  processCssUrls: false,
  publicPath: 'public',
});

mix.react('src/app.js', 'public/js').sass('src/app.sass', 'public/css');
