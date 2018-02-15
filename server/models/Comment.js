const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const { Schema } = mongoose;

const commentSchema = new Schema({   
    _feedID: {type: Schema.Types.ObjectId},
    _parentID: {type: Schema.Types.ObjectId},
    slug: String,
    full_slug: String,
    date_created: Date,
    author: {
        _userID: {type: Schema.Types.ObjectId},
        name: String
    },    
    text: String  
});

mongoose.model('comments', commentSchema);