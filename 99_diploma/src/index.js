require('module-alias/register');
const express = require('express');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

const showdown = require('showdown');
const converter = new showdown.Converter({ noHeaderId: true, tables: true });

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

// Get all notes
app.get('/api/v1/notes', isAuth, async (req, res) => {
  try {
    const { user_id } = req.user;
    const { page } = req.query;
    const { rows } = await db.raw(
      `
        SELECT *, COALESCE(CEIL((SELECT COUNT(*) FROM notes WHERE user_id = :user_id)::numeric / page_size)) AS total_pages
        FROM notes
        WHERE user_id = :user_id
        ORDER BY note_id DESC
        LIMIT (SELECT page_size FROM notes WHERE user_id = :user_id LIMIT 1)
        OFFSET ((:page - 1 ) * (SELECT page_size FROM notes WHERE user_id = :user_id LIMIT 1))
    `,
      { user_id, page },
    );
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.message);
    res.cookie('authError', 'There is a server error. Please try again later.').redirect('/');
  }
});

// Add one new note
app.post('/api/v1/add', isAuth, async (req, res) => {
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
    console.log(rows);
    res.status(200).json({ ...rows[0] });
  } catch (err) {
    console.log(err.message);
    res.cookie('authError', 'There is a server error. Please try again later.').redirect('/');
  }
});

// Edit one note
app.patch('/api/v1/edit/:id', isAuth, async (req, res) => {
  try {
    const { title, text } = req.body;
    const { id } = req.params;
    const { user_id } = req.user;
    const html = converter.makeHtml(text);
    const { rows } = await db.raw(
      `
        UPDATE notes
        SET title = :title, text = :text, html = :html
        WHERE note_id = :id AND user_id = :user_id
        RETURNING *;
    `,
      { title, text, html, id, user_id },
    );
    console.log(rows);
    res.status(200).json({ ...rows[0] });
  } catch (err) {
    console.log(err.message);
    res.cookie('authError', 'There is a server error. Please try again later.').redirect('/');
  }
});

// Get one note by id
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

// Get one note by id
app.delete('/api/v1/delete/:id', isAuth, async (req, res) => {
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
