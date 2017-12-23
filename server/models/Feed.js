const mongoose = require('mongoose');
//require('./Comment');
//const Comment = mongoose.model('comments');
const CommentSchema = require('./Comment');
//require('./models/Comment');

//const Schema = mongoose.Schema;
const { Schema } = mongoose; // tas pats kaip ir 2 eilutė

const feedSchema = new Schema({
    _userID: { type: Schema.Types.ObjectId, ref: 'User'  },
    title: String,
    pages: [{url: String, _id : false }],
    comments: [CommentSchema],
    date_created: { type: Date },
    date_updated: { type: Date },
    like_count: { type: Number, default: 0 },
});

mongoose.model('feeds', feedSchema);