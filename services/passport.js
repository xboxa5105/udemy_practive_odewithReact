import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { default as keys } from "../config/keys";
export default passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log('accessToken', accessToken)
      // User.findOrCreate({ googleId: profile.id }, function(err, user) {
      //   return cb(err, user);
      // });
    }
  )
);
