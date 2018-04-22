const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const { Schema } = mongoose; // tas pats kaip ir 2 eilutė

const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    username: String,
});

mongoose.model('users', userSchema);