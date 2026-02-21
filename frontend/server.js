const path = require('path');
const express = require('express');
const jsonServer = require('json-server');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname)));

const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
app.use(middlewares);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)});