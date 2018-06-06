const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Feed = mongoose.model('feeds');
const request = require('request-promise');
const { parseFacebookData, parseTwitterData, parseYoutubeData, sortObjectsByDate } = require('../common/helpers');
var Twitter = require('twitter');
var twitterConfig = require('../config/twitterKeys.js');
var T = new Twitter(twitterConfig);

module.exports = app => {
  app.post('/api/feed', requireLogin, (req, res) => {
    const { title, pages, source } = req.body;
    var feed = new Feed({
      _userID: req.user.id,
      title,
      pages: pages,
      date_created: Date.now(),
      date_updated: Date.now()
    });

    feed.save(function (err, feed) {
      if (err) {
        return res.status(422).json({
          message: 'Could not save post'
        });
      }
      res.json(feed);
    });
  });

  app.post('/api/feed/validate/fields', requireLogin, (req, res, next) => {
    var body = req.body;
    console.log(body);
    var facebookPagesString = [];
    var twitterPagesString = [];
    var youtubePagesString = [];
    if (req.body.pages) {
      req.body.pages.forEach(element => {
        if (element['url'] && element.source === "facebook") {
          facebookPagesString.push(element['url'].trim());
        } 
        else if (element['url'] && element.source === "twitter") {
          twitterPagesString.push(element['url'].trim());
        }
        else if (element['url'] && element.source === "youtube") {
          youtubePagesString.push(element['url'].trim());
        }
      });
    }

    if (facebookPagesString.toString()) {
    const options = {
      method: 'GET',
      uri: `https://graph.facebook.com/v2.11/?ids=${facebookPagesString.toString()}`,
      qs: {
        access_token: keys.fbAccessKey,
      },
      json: true
    };
    
    request(options)
      .then(result => {
        //console.log(result);
        if (!result) {
          body.errors = "Specified pages are empty";
          res.send({ body });
        }
        return res.send("Valid")
      }).catch(function (err) {
        var errorString = err.error.error.message.replace(/,/g, ", ");
        return res.status(200).send({ error: errorString });
      });
    } else {
      return res.send({});
    }
  });

  //Get all user feeds
  app.get('/api/feed', requireLogin, async (req, res) => {
    var feeds = {
      userFeeds: [],
      likedFeeds: []
    };

    try {
      const userFeeds = await Feed.find({ _userID: req.user.id }, {feedData: 0}, function (err, feeds) {
        if (err) {
          return res.status(500).send("There was a problem parsing feed.");
        }
        if (!feeds) {
          return res.status(404).send("Feed not found.");
        }
        // res.status(200).send(feeds);
        return feeds;
      });

      const likedFeeds = await Feed.find({ likes: mongoose.Types.ObjectId(req.user.id) }, {feedData: 0}, { sort: { date_created: -1 } }, function (err, feeds) {
        if (err) {
          return res.status(500).send("There was a problem parsing feed."); 
        }
        if (!feeds) {
          return res.status(404).send("Feeds not found."); 
        }
        return feeds;
      });

      feeds.userFeeds = userFeeds;
      feeds.likedFeeds = likedFeeds;
      return res.status(200).send(feeds);
    } catch (err) {
      // console.log(error);
      return res.status(500).send("There was a problem parsing user feeds.");
    }
  });

  app.get('/api/feedAll', async (req, res) => {

    var feedsByDate = [];
    var feedsByLikes = [];

    var feeds = {
      feedsByDate: [],
      feedsByLikes: []
    };

    try {
      feedsByLikes = await Feed.find({}, {feedData: 0}, { sort: { like_count: -1 } }).limit(1000);
      feedsByDate = await Feed.find({}, {feedData: 0}, { sort: { date_created: -1 } }).limit(1000);
      feeds.feedsByLikes = feedsByLikes;
      feeds.feedsByDate = feedsByDate;

      return res.status(200).send(feeds);

    } catch (err) {
      return res.status(500).send("There was a problem parsing feeds.");
    }

  });

  //Get feed by id
  app.get('/api/feed/:feed_id', async (req, res) => {   
    try {
      let feedObj = await Feed.findById(req.params.feed_id);

      if (!feedObj.feed_updated || Date.now() - new Date(feedObj.feed_updated).getTime() > 900000) {
        var facebookPagesString = [];
        var twitterPagesString = [];
        var youtubePagesString = [];
        if (feedObj.pages) {
          feedObj.pages.forEach(element => {
            if (element.source === 'facebook') {
              facebookPagesString.push(element.url);
            } else if (element.source === 'twitter') {
              twitterPagesString.push(element.url);
            } else if (element.source === 'youtube') {
              youtubePagesString.push(element.url);
            }
          });
        }
        
        feedObj = feedObj.toJSON();
        let promises = [];
        let feedData = [];
        let facebookData = facebookPagesString.length ? promises.push(parseFacebookData(facebookPagesString)) : [];
        let twitterData = twitterPagesString.length ?  promises.push(parseTwitterData(twitterPagesString)) : [];
        let youtubeData = youtubePagesString.length ?  promises.push(parseYoutubeData(youtubePagesString)) : [];
        
        await Promise.all(promises).then(responses => {
          responses.map(response => feedData = [].concat.apply(feedData, response));
        });
        
        feedData = sortObjectsByDate(feedData);
        feedObj.feedData = feedData.slice(0, 200);

        await Feed.update(
          {
            "_id": req.params.feed_id,
          },
          {
            "$set": {
              "feedData": feedObj.feedData,
              "feed_updated": Date.now(),
            }
          }
        );
        console.log("updated");
      }

      res.json(feedObj);
    } catch (err) {
      console.log(err);
      return res.status(500).send("There was a problem parsing feed.");
    }
  });

  //update feed
  app.put('/api/feed/:feed_id', requireLogin, (req, res) => {
    const feed = {
      title: req.body.title,
      pages: req.body.pages,
      date_updated: Date.now(),
      feedData: [],
      feed_updated: null,
    };
    //console.log(req);
    Feed.findOneAndUpdate({_id: req.params.feed_id, _userID: req.user.id}, feed, function (err, data) {
      if (err) {
        return res.status(500).send("There was a problem updating feed.");
      }
      if (!data)
        return res.status(401).send("Not authorized to modify this feed");
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
}
