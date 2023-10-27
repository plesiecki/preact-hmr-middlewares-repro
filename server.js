const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const path = require('path');

const app = express();
const compiler = webpack(config);

const static = express();

static.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
);

static.use(
  require(`webpack-hot-middleware`)(compiler, {
    log: false,
    path: `/hmr`,
    heartbeat: 10 * 1000,
  })
);

var router = express.Router();

router.get('/', function (req, res, next) {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  </head>
  <body>
  <div id="app"></div>
  <script src="http://localhost:8888/main.js"></script>
  </body>
  </html>`);
  next();
});

app.use(router);

app.listen(8080, () => console.log('App is listening on port 8080!'));

static.use(express.static(path.resolve(__dirname, 'dist', 'client')));

static.listen(8888, () => console.log('Static is listening on port 8888!'));
