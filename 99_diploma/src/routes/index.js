const isAuth = require('../middlewares/isAuth');
const router = require('express').Router();

router.get('/', isAuth, async (req, res) => {
  res.redirect('/dashboard');
});

router.get('/dashboard', isAuth, async (req, res) => {
  res.render('dashboard', { ...req.user });
});

module.exports = router;
