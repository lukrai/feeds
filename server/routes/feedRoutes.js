const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Feed = mongoose.model('feeds');
const request = require('request-promise');
const { parseFacebook } = require('../common/helpers');
var Twitter = require('twitter');
var twitterConfig = require('../config/twitterKeys.js');
var T = new Twitter(twitterConfig);

var params = {
  q: '#nodejs',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

module.exports = app => {
  app.post('/api/feed', requireLogin, (req, res) => {
    const { title, pages } = req.body;

    var feed = new Feed({
      _userID: req.user.id,
      title,
      pages: pages,
      date_created: Date.now(),
      date_updated: Date.now()
    });

    feed.save(function (err, feed) {
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

  app.post('/api/feed/validate/fields', requireLogin, (req, res, next) => {
    var body = req.body;
    // var title = body.title ? body.title.trim() : '';
    console.log(body);
    var pagesString = [];
    req.body.pages.forEach(element => {

      pagesString.push(element['url'].trim());
    });

    const options = {
      method: 'GET',
      uri: `https://graph.facebook.com/v2.11/?ids=${pagesString.toString()}`,
      qs: {
        access_token: keys.fbAccessKey,
      },
      json: true
    };
    request(options)
      .then(result => {
        console.log(result);
        if (!result) {
          body.errors = "Specified pages are empty";
          res.send({ body });
        }
        res.send("Valid")
      }).catch(function (err) {
        var errorString = err.error.error.message.replace(/,/g, ", ");
        res.status(200).send({ error: errorString });
      });
  });

  //Get all user feeds
  app.get('/api/feed', requireLogin, (req, res) => {

    Feed.find({ _userID: req.user.id }, function (err, feeds) {
      if (err)
        return res.status(500).send("There was a problem parsing feed.");
      if (!feeds)
        return res.status(404).send("Feed not found.");
      res.status(200).send(feeds);
    });
  });

  app.get('/api/feedAll', async (req, res) => {

    var feedsByDate = [];
    var feedsByLikes = [];

    var feeds = {
      feedsByDate: [],
      feedsByLikes: []
    };

    try {
      feedsByLikes = await Feed.find({}, null, { sort: { likes_count: -1 } }).limit(1000);
      feedsByDate = await Feed.find({}, null, { sort: { date_created: -1 } }).limit(1000);
      feeds['feedsByLikes'] = feedsByLikes;
      feeds['feedsByDate'] = feedsByDate;

      return res.status(200).send(feeds);

    } catch (err) {
      return res.status(500).send("There was a problem parsing feeds.");
    }

  });

  //Get feed by id
  app.get('/api/feed/:feed_id', async (req, res) => {   
    try {
      let feedObj = await Feed.findById(req.params.feed_id);

      var pagesString = [];
      feedObj.pages.forEach(element => {
        pagesString.push(element['url']);
      });
      
      let feedData = feedObj.toJSON();
      let facebookData = await parseFacebook(pagesString);

      feedData['feedData'] = facebookData;

      res.json(feedData);
    } catch (err) {
      return res.status(500).send("There was a problem parsing feed.");
    }
  });

  //update feed
  app.put('/api/feed/:feed_id', requireLogin, (req, res) => {
    const feed = {
      title: req.body.title,
      pages: req.body.pages,
      date_updated: Date.now()
    };
    //console.log(req);
    Feed.findByIdAndUpdate(req.params.feed_id, feed, function (err, data) {
      if (err)
        return res.status(500).send("There was a problem updating feed.");
      if (!data)
        return res.status(404).send("Feed not found.");
      res.status(200).send("Feed updated");
    });
  });

  //delete feed
  app.delete('/api/feed/:feed_id', requireLogin, (req, res) => {
    Feed.findByIdAndRemove(req.params.feed_id, function (err) {
      if (err)
        return res.status(500).send("There was a problem deleting feed.");
      res.status(200).send("Feed deleted.");
    });
  });

  app.put('/api/feed/:feed_id/like', requireLogin, async (req, res) => {
    await Feed.update(
      {
        "_id": req.params.feed_id,
        "likes": { "$ne": req.user._id }
      },
      {
        "$inc": { "like_count": 1 },
        "$push": { "likes": req.user._id }
      }
    )

    return res.status(200).send("Feed liked.");
  });

  app.put('/api/feed/:feed_id/unlike', requireLogin, async (req, res) => {
    await Feed.update(
      {
        "_id": req.params.feed_id,
        "likes": req.user._id
      },
      {
        "$inc": { "like_count": -1 },
        "$pull": { "likes": req.user._id }
      }
    )

    return res.status(200).send("Feed unliked.");

  });

  app.get('/api/twitter', async (req, res) => {
    await T.get('search/tweets', params, function (err, data, response) {
      // If there is no error, proceed
      if (!err) {
        // Loop through the returned tweets
        for (let i = 0; i < data.statuses.length; i++) {
          // Get the tweet Id from the returned data
          let id = { id: data.statuses[i].id_str }
          // Try to Favorite the selected Tweet

        }
      } else {
        console.log(err);
      }
      // console.log(response);
      console.log(data);
    });
  });
}
