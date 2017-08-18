const express = require('express');

const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/mxmchat', (req, resp) => {
  resp.sendFile(path.join(`${__dirname}/index.html`));
});

app.listen(1337);
