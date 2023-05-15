require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { findUserByUserName, createUser, createSession } = require('@src/db');
const updateUserData = require('../../db/db_methods/update/updateUserData');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

router.get('/auth/google', passport.authenticate('google'));

router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    try {
      const { session_id } = req.user;
      return res.cookie('sessionId', session_id).redirect('/dashboard');
    } catch (err) {
      console.log(err.message);
      res.cookie('authError', 'There is a server error. Please try again later.').redirect('/');
    }
  },
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/oauth2/redirect/google',
      scope: ['email'],
      prompt: 'select_account',
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const username = profile._json.email.split('@')[0];
        const user = await findUserByUserName(username);
        user.password = accessToken;

        if (!user) {
          const { rows } = await createUser(username, accessToken);
          const session_id = await createSession(rows[0].user_id);

          return cb(null, { session_id, ...rows[0] });
        } else {
          const { rows } = await updateUserData(user);
          const session_id = await createSession(rows[0].user_id);

          return cb(null, { session_id, ...rows[0] });
        }
      } catch (err) {
        console.log(err);
        return cb(err);
      }
    },
  ),
);

module.exports = router;
