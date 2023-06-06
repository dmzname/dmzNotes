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

router
  .route('/archive(/:id)?')
  .patch(isAuth, async (req, res, next) => {
    try {
      const { user_id } = req.user;
      const { id } = req.params;

      const { rows } = await controllers.isArchivedNote({ user_id, id });
      res.status(200).json({ ...rows[0] });
    } catch (err) {
      err._message = 'Error occurred while archiving the note. Please try again later.';
      next(err);
    }
  })
  .delete(isAuth, async (req, res, next) => {
    try {
      const { user_id } = req.user;
      const { id } = req.params;

      if (!id) {
        await controllers.deleteAllArchive(user_id);
        return res.sendStatus(200);
      }

      await controllers.deleteOneNote(user_id, id);
      return res.sendStatus(200);
    } catch (err) {
      err._message = 'Error occurred while delete. Please try again later.';
      next(err);
    }
  });

router.get('/notes', isAuth, async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { page, age, search } = req.query;
    const isArchive = age === 'archive';
    const { rows } = !isArchive
      ? await controllers.getAllNotes({ user_id, page, age, search })
      : await controllers.getArchiveNotes({ user_id, page, search });

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
