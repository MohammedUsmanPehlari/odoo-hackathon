const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const router = express.Router();

passport.use(new GitHubStrategy({
    clientID: "Ov23linjY3xqOXmNN8S8",
    clientSecret: "88c1fd1b966ad8209c15eb63960e206aed8ff324",
    callbackURL: "http://localhost:3000/login"
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

router.get('/', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  });

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.send(`<h1>Profile</h1><p>Hello, ${req.user.username}</p><a href="/auth/logout">Logout</a>`);
});

module.exports = router;
