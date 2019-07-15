"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser(async (user, done) => {
  const userData = await User.findOne({name: user.name});
  done(null, userData);
});

passport.deserializeUser(async (user, done) => {
  const userData = await User.findOne({name: user.name});
  done(null, userData);
});

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      let user = await User.findOne({name: username});

      if (!user || user.password !== password) {
        return done({
          type: 'login',
          message: 'Invalid login or password'
        });
      }

      done(null, user);
    } catch (e) {
      done(e);
    }
  }));

passport.use('local-registration', new LocalStrategy({
    passReqToCallback: true
  },
  async (req, name, password, done) => {
    try {
      let user = await User.findOne({name: req.name});

      if (user) {
        return done({
          type: 'login',
          message: 'login already exists'
        });
      }

      user = await User.create({
        name: name,
        password: password
      });

      done(null, user);

    } catch (e) {
      done(e);
    }
  }));

passport.logout = (req, res, next) => {
  try {
    req.logout();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

passport.isUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.sendStatus(401);
  }
};

passport.loginError = (err, req, res, next) => {
  if (err.type === 'login') {
    res.status(400).send(err);
  } else {
    next(err);
  }
};

module.exports = passport;