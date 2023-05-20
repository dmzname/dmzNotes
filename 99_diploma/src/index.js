require('module-alias/register');
const express = require('express');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

const showdown = require('showdown');
const converter = new showdown.Converter({ noHeaderId: true });

const app = express();

const mainRoutes = require('./routes');
const authRoutes = require('./routes/authorization');
const googleAuthRoute = require('./routes/authorization/googleAuth');

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

// TODO разделить на модули // START ==>
const db = require('./db/connect');
const { isAuth } = require('./middlewares');

app.get('/api/v1/notes', isAuth, async (req, res) => {
  try {
    const { user_id } = req.user;
    const { rows } = await db.raw(
      `
        SELECT *
        FROM notes
        WHERE user_id = :user_id
    `,
      { user_id },
    );
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.message);
    res.cookie('authError', 'There is a server error. Please try again later.').redirect('/');
  }
});

app.post('/api/v1/add-note', isAuth, async (req, res) => {
  try {
    const { title, text } = req.body;
    const { user_id } = req.user;
    const html = converter.makeHtml(text);
    const { rows } = await db.raw(
      `
        INSERT INTO notes (user_id, title, text, html)
        VALUES (:user_id, :title, :text, :html)
        RETURNING *;
    `,
      { user_id, title, text, html },
    );
    res.status(200).json({ ...rows[0] });
  } catch (err) {
    console.log(err.message);
    res.cookie('authError', 'There is a server error. Please try again later.').redirect('/');
  }
});

app.get('/api/v1/note/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    const { rows } = await db.raw(
      `
        SELECT *
        FROM notes
        WHERE note_id = :id AND user_id = :user_id;
    `,
      { id, user_id },
    );
    res.status(200).json({ ...rows[0] });
  } catch (err) {
    console.log(err.message);
    res.cookie('authError', 'There is a server error. Please try again later.').redirect('/');
  }
});

// <== END

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(PORT, () => {
  console.log(` Server started on: http://localhost:3000`);
});
