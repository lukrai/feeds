const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Feed = mongoose.model('feeds');

module.exports = app => {
    app.post('/api/feed', requireLogin, /*async*/(req, res) => {
        const { title, pages } = req.body;
        
        var feed = new Feed({
            _userID: req.user.id,
            title,
            pages: pages,
            date_created: Date.now(),
            date_updated: Date.now()
        });
        //var feed = new Feed();
        console.log(feed + ' aaa' + req);

        // feed.save( function (err) {
        //     if(err) return res.status(422).send(err);           
        // })

        feed.save(function(err, feed) {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: 'Could not save post'
              });
            }
            res.json(feed);
        });
        // try {
        //     await feed.save();
        //     res.status(201).send.json({message: 'Added!'});
        // } catch(err) {
        //     res.status(422).send(err);
        // }

    });

    //Get all user feeds
    app.get('/api/feed', requireLogin, (req, res) => {

        Feed.find({_userID: req.user.id} , function (err, feeds) {
            if (err) 
                return res.status(500).send("There was a problem parsing feed.");
            if (!feeds) 
                return res.status(404).send("Feed not found.");    
            res.status(200).send(feeds);
        });

        // try{
        //     const feeds = await Feed.find({ _userID: req.user.id });
        //     if (!feeds) 
        //         return res.status(404).send("No feeds found.");
        //     //res.status(200).send(feeds);
        //     res.json(feeds);
        // } catch(err){
        //     res.status(500).send(err);
            
        // }
    });

    //Get feed by id
    app.get('/api/feed/:feed_id', requireLogin, (req, res) => {

        Feed.findById(req.params.feed_id, function (err, feed) {
            if (err) {
                return res.status(500).send("There was a problem parsing feed.");
            }
            if (!feed) {
                console.log(feed);
                //return res.status(404).send("Feed not found.");    
                return res.status(404).json({
                    message: 'Feed not found'
                  });
            }
            res.status(200).send(feed);
        });
    });

    app.get('/api/feed_fb_data/:feed_id', requireLogin, (req, res) => {
    //suformuoti fb duomenis
        Feed.findById(req.params.feed_id, function (err, feed) {
            if (err)
                res.send(err);

            res.json(feed);
        });
    });        
    
    //update feed
    app.put('/api/feed/:feed_id', (req, res) => {
        const feed = {
            title: req.body.title,
            date_updated: Date.now()
        };
        console.log(req);
        Feed.findByIdAndUpdate(req.params.feed_id, feed, function(err, data){
            if (err) 
                return res.status(500).send("There was a problem updating feed.");
            if (!data) 
                return res.status(404).send("Feed not found.");    
            res.status(200).send("Feed updated");
        });
    });

    //delete fee
    app.delete('/api/feed/:feed_id', (req, res) => {
        Feed.findByIdAndRemove(req.params.feed_id, function (err) {
            if (err) 
                return res.status(500).send("There was a problem deleting feed.");
            res.status(200).send("Feed deleted.");
        });
    });
}