var passport = require("passport");
var GitHubStrategy = require("passport-github2").Strategy;
const config = require("config");

const GITHUB_CLIENT_SECRET = config.get("github.client.secret");
const GITHUB_CLIENT_ID = config.get("github.client.id");
const redirect_uri = "http://303-08:3000/github/callback";

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: redirect_uri,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile.id);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;