"use strict";
const mongoose = require('mongoose');
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

const db = {
  User: mongoose.model('User')
};

module.exports = class User {

  static async getData(req, res, next) {
    try {
      const user = await db.User.findOne({name: req.user.name});
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }

  static async getMusic(req, res, next) {
    try {

      socket.emit('getMusic', {
        userId: req.user._id,
        artistList: req.query.artistList,
        timer: req.query.timer
      });

      socket.on(req.user._id, data => {
        console.log(data);
      });

      res.sendStatus(200);
    } catch (e) {
      next(e)
    }
  }

}