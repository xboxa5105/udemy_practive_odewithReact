/* eslint-disable consistent-return */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from '../config/keys';
import User from '../models/User';

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

export default passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (async (accessToken, refreshToken, profile, cb) => {
      console.log('accessToken', accessToken);
      User.findOne({ googleId: profile.id }, (err, existingUser) => {
        if (existingUser) {
          return cb(null, existingUser);
        }
        new User({ googleId: profile.id }).save().then((user) => cb(null, user));
      });
      // const user = await User.findOne({ googleId: profile.id })
      // if (user) {
      //   console.log("Exist user")
      // }else{
      //   await new User({ googleId: profile.id }).save();
      // }
    }),
  ),
);
