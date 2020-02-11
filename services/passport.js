import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { default as keys } from "../config/keys";
import User from "../models/User";

export default passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, cb) {
      console.log("accessToken", accessToken);
      console.log("profile", profile);
      await new User({ googleID: profile.id }).save();
      // console.log(await User.find({}))
      // User.findOrCreate({ googleId: profile.id }, function(err, user) {
      //   return cb(err, user);
      // });
    }
  )
);
