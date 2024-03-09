const mongoose = require('mongoose');

const mongodbURL = 'mongodb+srv://GoFood:GoFood@gofood.taatr5v.mongodb.net/GoFood?retryWrites=true&w=majority';

const mongodb = mongoose.connect(mongodbURL);

module.exports = mongodb;