const router = require('express').Router();
const controllers = require(`@src/controllers`);
const isAuth = require(`@src/middlewares/isAuth`);

const express = require('express');

const urlencodedParser = express.urlencoded({ extended: false });

// SIGNUP ROUTE
router.post('/signup', urlencodedParser, controllers.signup);

// LOGIN ROUTE
router.post('/login', urlencodedParser, controllers.login);

// LOGOUT ROUTE
router.get('/logout', isAuth, controllers.logout);

module.exports = router;
