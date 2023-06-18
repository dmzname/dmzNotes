require('module-alias/register');
const express = require('express');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');

const app = express();

const mainRoutes = require('./routes');
const authRoutes = require('./routes/authorization');
const googleAuthRoute = require('./routes/authorization/googleAuth');
const notesRoutes = require('./routes/notes');

const { launch } = require('puppeteer');
const { getOneNote } = require('./controllers');
const { isAuth } = require('./middlewares');

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

app.get('/download-pdf', isAuth, async (req, res, next) => {
  try {
    const { id } = req.query;
    const { user_id } = req.user;

    const { rows } = await getOneNote({ id, user_id });

    const [noteData = {}] = rows;
    const { title: filename, html } = noteData;

    const browser = await launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    const sanitizedFilename = filename.toLowerCase().replaceAll(' ', '_');
    const encodedFilename = encodeURIComponent(sanitizedFilename);
    const contentDisposition = `attachment; filename*=UTF-8''${encodedFilename}.pdf`;

    res.setHeader('Content-Disposition', contentDisposition);
    res.contentType('application/pdf');
    res.send(pdf);
  } catch (err) {
    next(err);
  }
});

app.all('/api/v1/*', (req, res, next) => {
  const err = new Error('There is a server error. Please try again later');
  next(err);
});

app.get('*', (req, res) => {
  res.render('404');
});

// Error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .send(err._message || 'There is a server error. Please try again later');
});

app.listen(PORT, () => {
  console.log(` Server started on: http://localhost:${PORT}`);
});
