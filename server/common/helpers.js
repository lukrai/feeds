const keys = require('../config/keys');
const request = require('request-promise');

async function parseFacebook(pagesString) {
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
      var feedData= [];
      for (pageName in fbRes) {
        if (fbRes.hasOwnProperty(pageName)) {
          fbRes[pageName]['feed']['data'].forEach((obj) => obj['source'] = 'facebook');
          feedData = feedData.concat(fbRes[pageName]['feed']['data']);
        }
      }
      feedData.sort(function (a, b) {
        return new Date(b.created_time).getTime() - new Date(a.created_time).getTime();
      });
      data = feedData;
      // return feedData;
    }).catch(function (err) {
      return res.status(500).send("There was a problem parsing feed.");
      console.log(err);
    });
    return data;
}

module.exports.parseFacebook = parseFacebook;