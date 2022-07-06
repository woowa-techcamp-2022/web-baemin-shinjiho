const express = require('express');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const mainRoute = require('./routes');

// DB
const adapter = new FileSync('db.json');
const db = low(adapter);

const app = express();
const port = process.env.PORT || 8080;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views/pages/'));

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', mainRoute);

app.listen(port, () => {
  console.log(`Server Connected:  http://localhost:${port}`);
});
