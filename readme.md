# Laravel Vuetify SPA Starter with i18n
Starter SPA built with Laravel 6.0, JWT Auth, Vue 2, Vue Router 3, Vuex 3, Axios, Vuetify 2, vue-i18n

## Included
* [Laravel 6.0](https://laravel.com/docs/6.0)
* [Vue 2](https://vuejs.org)
* [Vue Router 3](http://router.vuejs.org)
* [Vuex 3](http://vuex.vuejs.org)
* [Axios](https://github.com/mzabriskie/axios)
* [Authentication with JWT Token](https://github.com/tymondesigns/jwt-auth)
* [Vuetify](https://vuetifyjs.com/en/getting-started/quick-start)
* [vue-i18n](https://kazupon.github.io/vue-i18n)

## Installation:
* Clone the repo
* Copy `.env.example` to `.env`
* Configure `.env`
* Make sure `storage/framework/cache`, `storage/framework/sessions`, `storage/framework/views` directories exist. Run `mkdir -p storage/framework/{sessions,views,cache}`
* Run `composer install`
* Run `php artisan key:generate`
* Run `php artisan jwt:secret`
* Run `php artisan migrate`
* Run `npm install`

## Usage
* Run `npm run watch` for live reloading using BrowserSync
* Run `npm run hot` for hot reloading
* Run `npm run prod` for production buid

## Bonus
* Lightweight [Vuetify Toast Snackbar](https://github.com/eolant/vuetify-toast-snackbar)
* Checkout this [Confirm Dialog Component](https://gist.github.com/eolant/ba0f8a5c9135d1a146e1db575276177d) that you can add and extend in your application
