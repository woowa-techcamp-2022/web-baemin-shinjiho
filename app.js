const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const mainRouter = require('./routes');

// DB
const adapter = new FileSync('db.json');
const db = low(adapter);

const app = express();
const port = process.env.PORT || 8080;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', mainRouter);

app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Server Connected:  http://localhost:${port}`);
});
