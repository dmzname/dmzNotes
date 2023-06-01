require('module-alias/register');
const express = require('express');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

const app = express();

const mainRoutes = require('./routes');
const authRoutes = require('./routes/authorization');
const googleAuthRoute = require('./routes/authorization/googleAuth');
const notesRoutes = require('./routes/notes');

// Variables
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Views
nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
});
app.set('view engine', 'njk');

// Routes
app.use(mainRoutes);
app.use(authRoutes);
app.use(googleAuthRoute);
app.use('/api/v1', notesRoutes);

app.all('/api/v1/*', (req, res, next) => {
  const err = new Error('There is a server error. Please try again later');
  next(err);
});

app.get('*', (req, res) => {
  res.render('404');
});

// Error middleware
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send(err._message || 'There is a server error. Please try again later');
});

app.listen(PORT, () => {
  console.log(` Server started on: http://localhost:3000`);
});
