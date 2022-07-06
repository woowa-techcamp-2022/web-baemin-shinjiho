const express = require('express');
const path = require('path');



const app = express();
const port = process.env.PORT || 8080;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'frontend/src/pages'));

app.use(express.static(path.join(__dirname, 'frontend/src')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render('main/main', { title: 'Hey', message: 'Hello there!'});
  });


app.listen(port, () => {
  console.log(`Server Connected:  http://localhost:${port}`);
});