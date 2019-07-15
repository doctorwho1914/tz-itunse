// Example model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Number,
  name: String,
  password: String
});


mongoose.model('User', UserSchema);