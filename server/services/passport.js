const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
        const existingUser = await User.findOne({ googleID: profile.id });
        //console.log("ACCESS TOKEN: " +accessToken);
        if (existingUser) {
            //user already exists
            return done(null, existingUser);
        }
        const user = await new User({ googleID: profile.id }).save();
        done(null, user);
    })
);