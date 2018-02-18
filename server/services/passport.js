const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientSecret: keys.googleClientSecret,
        clientID: keys.googleClientID,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });       
        if (existingUser) {
            //user already exists
            return done(null, existingUser);
        }
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
    })
);

passport.use(
    new FacebookStrategy({
        clientID: keys.FACEBOOK_APP_ID,
        clientSecret: keys.FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/callback',
        
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ facebookId: profile.id });
        console.log(profile.id);
        if (existingUser) {
            return done(null, existingUser);
        }
        const user = await new User({ facebookId: profile.id }).save();
        done(null, user);
  }
));