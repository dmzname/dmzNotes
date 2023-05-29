const router = require('express').Router();
const controllers = require(`@src/controllers`);
const { isAuth } = require(`@src/middlewares`);

router.post('/add', isAuth, async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { title, text } = req.body;
    const { rows } = await controllers.createNewNote({ user_id, title, text });

    res.status(200).json({ ...rows[0] });
  } catch (err) {
    err._message = 'Error occurred while creating a note. Please try again later';
    next(err);
  }
});

router.patch('/edit/:id', isAuth, async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { title, text } = req.body;
    const { id } = req.params;

    const { rows } = await controllers.editNote({ user_id, title, text, id });
    res.status(200).json({ ...rows[0] });
  } catch (err) {
    err._message = 'Error occurred while editing the note. Please try again later';
    next(err);
  }
});

router.get('/notes', isAuth, async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { page, age } = req.query;
    const { rows } = await controllers.getAllNotes({ user_id, page, age });

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

router.get('/note/:id', isAuth, async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { id } = req.params;

    const { rows } = await controllers.getOneNote({ id, user_id });
    res.status(200).json({ ...rows[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
