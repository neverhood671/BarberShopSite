const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Note = new Schema({
    userPhone: String,
    service: String,
    datetime: Date,
    userId: ObjectId
});

module.exports = mongoose.model('accounts', Account);