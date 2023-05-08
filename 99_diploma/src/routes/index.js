const isAuth = require('../middlewares/isAuth');
const router = require('express').Router();

router.get('/', isAuth, async (req, res) => {
  const authError = req.cookies['authError'];

  if (!req.sessionId || !req.user) {
    return res.render('index', !authError ? null : { authError });
  }
  res.redirect('/dashboard');
});

router.get('/dashboard', isAuth, async (req, res) => {
  if (!req.sessionId) {
    return res.redirect('/');
  }
  res.render('dashboard', { ...req.user });
});

module.exports = router;
