const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Feed = mongoose.model('feeds');
const request = require('request-promise');

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
    });
    
    const pageFieldSet = 'name, category, link, picture, is_verified';
    //Get feed by id
    app.get('/api/feed/:feed_id', requireLogin, (req, res) => {

        Feed.findById(req.params.feed_id, function (err, feed) {
            if (err) {
                return res.status(500).send("There was a problem parsing feed.");
            }
            if (!feed) {
                return res.status(404).json({
                    message: 'Feed not found'
                  });
            }
            //      
            //https://graph.facebook.com/?ids=footengo31,footengo01,Footengo69&fields=posts.limit(5){message,created_time,picture}&access_token={your_access_token}

            const options = {
                method: 'GET',
                uri: `https://graph.facebook.com/v2.11/?ids=MercedesAMG,Formula1`,
                qs: {
                  access_token: keys.fbAccessKey,
                  fields: 'feed.limit(3){description,message,created_time,from{name, picture}, picture.height(720), properties, source, attachments, likes.summary(1).limit(0), link}'//'feed.limit(3).order(reverse_chronological)'
                },
                json: true
              };
            request(options)
                .then(fbRes => {
                    console.log(fbRes);
                    console.log("---------------------");
                    var feedData = feed.toJSON();
                    feedData['feedData'] = [];
                    for (pageName in fbRes) {
                         if (fbRes.hasOwnProperty(pageName)) {                     
                            //feedData['feedData'].push(fbRes[pageName]['feed']['data']);
                            feedData['feedData'] = feedData['feedData'].concat(fbRes[pageName]['feed']['data']);
                            //console.log(fbRes[pageName]['feed']['data']);
                         }
                     }
                    console.log("---------------------");
                    console.log(feedData['feedData']);
                    // migth create another route for fb feed
                    res.json(feedData)
                });

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
    app.put('/api/feed/:feed_id', requireLogin, (req, res) => {
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
    app.delete('/api/feed/:feed_id', requireLogin, (req, res) => {
        Feed.findByIdAndRemove(req.params.feed_id, function (err) {
            if (err) 
                return res.status(500).send("There was a problem deleting feed.");
            res.status(200).send("Feed deleted.");
        });
    });
}