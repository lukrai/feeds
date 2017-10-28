const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const { Schema } = mongoose;

const commentSchema = new Schema({
    _userID: {type: Schema.Types.ObjectId},
    _feedID: {type: Schema.Types.ObjectId},
    text: String,
    date_created: { type: Date, default: Date.now },
    replies: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    }]
    
});

mongoose.model('comments', commentSchema);