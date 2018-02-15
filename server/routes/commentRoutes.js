const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Comment = mongoose.model('comments');
const request = require('request-promise');

module.exports = app => {

    app.post('/api/feed/:feedId/comment', requireLogin, (req, res) => {
        const { slug, full_slug, text, parentId } = req.body;
        //req.params.feedId
        var comment = new Comment({
           // _userID: req.user.id,
            _feedID: req.params.feedId,
            _parentID: parentId,
            date_created: Date.now(),
            text,
            slug,
            full_slug,
        });

        comment.save(function(err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Could not save comment'
                });
            }
            res.json(comment);
        });
    });

    //Get all feed comments
    app.get('/api/feed/:feedId/comment', (req, res) => {

        Comment.find({_feedID: req.params.feedId} , function (err, comments) {
            if (err) 
                return res.status(500).send("There was a problem parsing comments.");
            if (!comments) 
                return res.status(404).send("comments not found.");    
            res.status(200).send(comments);
        });       
    });

    app.get('/api/feed/:feedId/comment/:commentId', (req, res) => {
        Comment.findById(req.params.commentId, function (err, comment) {
            if (err) {
                return res.status(500).send("There was a problem parsing comment.");
            }
            if (!comment) {
                return res.status(404).json({
                    message: 'Feed not found'
                });
            }
            res.json(comment)           
        });
    });

    app.delete('/api/feed/:feedId/comment/:commentId', requireLogin, (req, res) => {
        Comment.findByIdAndRemove(req.params.commentId, function (err) {
            if (err) 
                return res.status(500).send("There was a problem deleting comment.");
            res.status(200).send("Comment deleted.");
        });
    });
}