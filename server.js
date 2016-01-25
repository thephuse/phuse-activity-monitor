'use strict';

const express = require('express');
const port = 3000;
const app = express();
const stats = require('./api/stats.js');

app.get("/", function(req, res) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Phuse Activity Monitor</title>
      </head>
      <body>
        <div id="app"></div>
      </body>
      <script src="http://localhost:4000/index.js"></script>
    </html>
  `;
  res.end(html);
});

app.get("/people", stats.people);

app.get("/times/:from/:to", stats.times);

app.listen(port);
