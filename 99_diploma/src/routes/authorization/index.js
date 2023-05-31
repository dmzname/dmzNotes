const router = require('express').Router();
const controllers = require(`@src/controllers`);
const { isAuth, urlencodedParser, authorizationValidate } = require(`@src/middlewares`);

async function authorizationMiddleware(req, res) {
  try {
    const { username, password } = req.body;
    const session_id = await controllers[`${req.url.split('/')[1]}`](username, password);
    return res.cookie('sessionId', session_id).redirect('/dashboard');
  } catch (err) {
    return res.cookie('authError', err.message).redirect('/');
  }
}

router.post('/signup', urlencodedParser, authorizationValidate, authorizationMiddleware);
router.post('/login', urlencodedParser, authorizationValidate, authorizationMiddleware);
router.get('/logout', isAuth, async (req, res) => {
  controllers.deleteSession(req.sessionId).then(() => {
    res.clearCookie('authError');
    res.clearCookie('sessionId').redirect('/');
  });
});

module.exports = router;
