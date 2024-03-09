const mongoose = require('mongoose');

const mongodbURL = 'mongodb+srv://<username>:<password>@gofood.taatr5v.mongodb.net/<database name>?retryWrites=true&w=majority';

const mongodb = mongoose.connect(mongodbURL);

module.exports = mongodb;
