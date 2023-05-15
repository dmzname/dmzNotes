const router = require('express').Router();
const controllers = require(`@src/controllers`);
const { isAuth, urlencodedParser, authorizationValidate } = require(`@src/middlewares`);

// SIGNUP ROUTE
router.post('/signup', urlencodedParser, authorizationValidate, controllers.signup);
router.post('/login', urlencodedParser, authorizationValidate, controllers.login);
router.get('/logout', isAuth, controllers.logout);

module.exports = router;
