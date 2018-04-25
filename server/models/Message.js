const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({ 
    id: { type: Schema.Types.ObjectId },   
    room: { type: Schema.Types.ObjectId },
    date: Date,
    author: {
        _id: { type: Schema.Types.ObjectId },
        username: String,
        googleId: String,
        facebookId: String
    },    
    text: String  
});

mongoose.model('messages', messageSchema);