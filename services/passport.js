import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { default as keys } from "../config/keys";
import User from "../models/User";

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
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log("accessToken", accessToken);
      console.log("profile", profile);
      User.findOne({ googleId: profile.id }, (existingUser) => {
        if (existingUser) {
          return cb(null, existingUser);
        } else {
          new User({ googleId: profile.id }).save().then((user) => {
            return cb(null, user);
          });
        }
      });
      // const user = await User.findOne({ googleId: profile.id })
      // if (user) {
      //   console.log("Exist user")
      // }else{
      //   await new User({ googleId: profile.id }).save();
      // }
    }
  )
);
