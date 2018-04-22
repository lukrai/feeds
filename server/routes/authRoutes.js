const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      //console.log(res);
      res.redirect('/');

    }
  );

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile']
  }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/fail'
    }),
    (req, res) => {
      //console.log(res);
      // Successful authentication, redirect home.
      res.redirect('/');
    });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/user/validate/username', requireLogin, (req, res, next) => {
    var body = req.body;
    console.log(body);

    User.find({ username: body.username }, function (err, data) {
      if (data.length) {
        return res.status(406).send({
          error: "Username is not unique"
        });
      } else {
        return res.status(200).send("Username is unique");
      }
    });
  });

  app.put('/api/user/:user_id', requireLogin, (req, res) => {
    const user = {
      username: req.body.username,
    };
    console.log(req.user._id);
    console.log("req.user._id");
    console.log(req.params.user_id);
    console.log(req.params.user_id === req.user._id.toString());
    if (req.user._id.toString() === req.params.user_id) {
      User.findByIdAndUpdate(req.params.user_id, user, function (err, data) {
        if (err) {
          return res.status(500).send("There was a problem updating user.");
        }
        if (!data) {
          return res.status(404).send("User not found.");
        }
        const finalUser = req.user;
        finalUser.username = user.username;
        console.log(finalUser + ' expected user');
        return res.status(200).send(finalUser);
      });
    } else {
      return res.status(401).send("User ids do not match");
    }
  });
}