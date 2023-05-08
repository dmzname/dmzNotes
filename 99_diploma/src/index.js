require('module-alias/register');
const express = require('express');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

const app = express();

const mainRoutes = require('./routes');
const authRoutes = require('./routes/authorization');

// Variables
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Views
nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
});
app.set('view engine', 'njk');

// Routes
app.use(mainRoutes);
app.use(authRoutes);

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(PORT, () => {
  console.log(` Server started on: http://localhost:3000`);
});
