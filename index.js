const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const hbs = require('hbs');
const path = require('path');
const expressSession = require('express-session');

const app = express();

//SETTING
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);
app.set('views', path.join(__dirname, './app/views'));

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(expressSession({secret: 'mySecret', resave: false, saveUninitialized: false}));
app.use(express.static(path.join(__dirname, './public')));

//ROUTERS
const home = require('./app/routes/home');
app.use(home);

app.listen(3000, () => {
  console.log('Listening on PORT 3001');
});
