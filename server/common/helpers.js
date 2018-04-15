const keys = require('../config/keys');
const request = require('request-promise');

const Twitter = require('twitter');
const twitterConfig = require('../config/twitterKeys.js');
var T = new Twitter(twitterConfig);

async function parseFacebookData(pagesString) {
  let data = [];
  const options = {
    method: 'GET',
    uri: `https://graph.facebook.com/v2.11/?ids=${pagesString.toString()}`,
    qs: {
      access_token: keys.fbAccessKey,
      fields: 'feed.limit(50){description,message,created_time,from{name, picture}, picture.height(720), properties, source, attachments, likes.summary(1).limit(0), link}'//'feed.limit(3).order(reverse_chronological)'
    },
    json: true
  };
  //https://graph.facebook.com/?ids=footengo31,footengo01,Footengo69&fields=posts.limit(5){message,created_time,picture}&access_token={your_access_token}
  await request(options)
    .then(fbRes => {
      var feedData = [];
      for (pageName in fbRes) {
        if (fbRes.hasOwnProperty(pageName)) {
          fbRes[pageName]['feed']['data'].forEach((obj) => obj['source'] = 'facebook');
          feedData = feedData.concat(fbRes[pageName]['feed']['data']);
        }
      }
      data = feedData;
    }).catch(function (err) {
      console.log(err);
      return res.status(500).send("There was a problem parsing facebook feed.");
    });
  return data;
}

async function parseTwitterData(pagesString) {
  let queryString = formatTwitterQuery(pagesString);
  if (!queryString) return;
  let twitterData = [];
  console.log(queryString);
  let params = {
    q: queryString,
    count: 50,
    result_type: 'recent',
    lang: 'en',
  }

  await T.get('search/tweets', params)
    .then(function (data) {
      for (let i = 0; i < data.statuses.length; i++) { // change to map
        const element = data.statuses[i];
        const obj = {
          created_time: element.created_at,
          id: element.id_str,
          text: element.text,
          entities: element.entities,
          user: element.user,
          retweet_count: element.retweet_count,
          favorite_count: element.favorite_count,
          source: 'twitter'
        }
        twitterData.push(obj);
      }
    })
    .catch(function (err) {
      console.log(err);
      return res.status(500).send("There was a problem parsing twitter feed.");
    });

  return twitterData;
}

function sortObjectsByDate(feedData) {
  feedData.sort(function (a, b) {
    return new Date(b.created_time).getTime() - new Date(a.created_time).getTime();
  });
  return feedData;
}

function formatTwitterQuery(string) {
  let queryString = "";

  let i;
  for (i = 0; i < string.length; i++) {
    if (i === 0) {
      queryString = `from:${string[i]}`;
    } else {
      queryString += `OR from:${string[i]}`;
    }
  }

  return queryString
}

module.exports.parseFacebookData = parseFacebookData;
module.exports.parseTwitterData = parseTwitterData;
module.exports.sortObjectsByDate = sortObjectsByDate;