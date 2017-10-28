const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Feed = mongoose.model('feeds');
const Like = mongoose.model('likes');

module.exports = app => {
    app.post('/api/like', async(req, res) => {
        var like = new Like({
            _userID: "59b829ba6355e619ec0e4837",
            _feedID: '59ba7ef20ef0281e48d94e7e',//req.user.id,

        });
        //const user = await req.feed.save();

        Feed.findByIdAndUpdate(like._feedID, {$inc: {like_count:1}}, {new: true}, function(err, data){
            if(err){
                console.log("Something wrong when updating data!");
            }
            console.log(data);
        });
        
        await like.save(function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Added!',
                data: like
            });
        });
    });

    app.get('/api/like', requireLogin, (req, res) => {

        Like.find({
            _userID: req.user.id
        }).
        //populate('author', 'name'). // only return the Persons name
        exec(function (err, like) {
            if (err) return handleError(err);
            res.send(like);
        })
    });

    app.delete('/api/like/:like_id', (req, res) => {
        Feed.findByIdAndUpdate('59ba7ef20ef0281e48d94e7e', {$inc: {like_count:-1}}, {new: true}, function(err, data){
            if(err){
                console.log("Something wrong when updating data!");
            }
            console.log(data);
        });
        Like.findByIdAndRemove(req.params.like_id, function (err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Like removed!'
            });
        });
    });

}