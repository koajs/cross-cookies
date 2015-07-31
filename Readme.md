
# cross-cookies

  Easily set cross subdomain cookies

## Installation

```
npm install cross-cookies
```

## Usage

```js
// Setup cors `withCredentials`
app.use(require('koa-cors')({
  origin: process.env.OTHER_SUBDOMAIN_URL,
  credentials: true
}))

app.use(require('cross-cookies')())
app.keys = ['zippity', 'doo', 'da']

app.use(function *(next) {
  this.crosscookies('token', 'some token');
})
```

> Note: If you're going to set cookies across subdomains, you're going to need
to be able to make requests across subdomains, so you'll need to set up CORS.

## License

(The MIT License)

Copyright (c) 2015 Matthew Mueller &lt;mattmuelle@gmail.com&gt;
