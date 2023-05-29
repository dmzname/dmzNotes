const router = require('express').Router();
const controllers = require(`@src/controllers`);
const { isAuth } = require(`@src/middlewares`);

// GET all notes, filtered by page and age note
router.get('/notes', isAuth, async (req, res) => {
  try {
    const { user_id } = req.user;
    const { page, age } = req.query;
    const { rows } = await controllers.getAllNotes({ user_id, page, age });

    res.status(200).json(rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('There is a server error. Please try again later');
  }
});

// CREATE new note
router.post('/add', isAuth, async (req, res) => {
  try {
    const { user_id } = req.user;
    const { title, text } = req.body;
    const { rows } = await controllers.createNewNote({ user_id, title, text });

    res.status(200).json({ ...rows[0] });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error occurred while creating a note. Please try again later');
  }
});

// EDIT note
router.patch('/edit/:id', isAuth, async (req, res) => {
  try {
    const { user_id } = req.user;
    const { title, text } = req.body;
    const { id } = req.params;

    const { rows } = await controllers.editNote({ user_id, title, text, id });
    res.status(200).json({ ...rows[0] });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error occurred while editing the note. Please try again later');
  }
});

// GET one note by id
router.get('/note/:id', isAuth, async (req, res) => {
  try {
    const { user_id } = req.user;
    const { id } = req.params;

    const { rows } = await controllers.getOneNote({ id, user_id });
    res.status(200).json({ ...rows[0] });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('There is a server error. Please try again later');
  }
});

module.exports = router;
