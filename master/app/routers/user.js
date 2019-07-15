const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const passport = require('../helpers/passport');

module.exports = (app) => {
  app.use('/', router);
};

router.post('/registration', passport.authenticate('local-registration'), (req, res) => {
  res.sendStatus(200)
});
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200)
});
router.get('/logout', passport.isUser, passport.logout);
router.get('/user',   passport.isUser, User.getData);
router.get('/getMusic', passport.isUser, User.getMusic);