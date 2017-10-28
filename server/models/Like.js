const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    _userID: { type: Schema.Types.ObjectId, ref: 'users' },
    _feedID: { type: Schema.Types.ObjectId, ref: 'feeds' },
    date_created: { type: Date, default: Date.now },
    
});

mongoose.model('likes', commentSchema);