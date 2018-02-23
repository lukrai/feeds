const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Message = mongoose.model('messages');
const request = require('request-promise');

module.exports = app => {

    app.get('/api/feed/:feedId/message', (req, res) => {     
        Message.find({room: req.params.feedId}, null, {sort: {date: 1}}).limit(100).exec(function (err, messages) {
            if (err) 
                return res.status(500).send("There was a problem parsing messages.");
            if (!messages) 
                return res.status(404).send("messages not found.");    
            res.status(200).send(messages);
        });    
    });
}
