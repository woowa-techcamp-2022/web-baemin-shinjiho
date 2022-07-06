const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');

const mainRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 8080;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: 'BAEMINAUTHvansdjvbajkelwr234',
    httpOnly: true,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

app.use('/', mainRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Server Connected:  http://localhost:${port}`);
});
