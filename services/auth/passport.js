const passport = require('passport');
const User = require('../../models/User');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    User.findByEmail(email)
      .then(user => {
        done(null, user);
      }).catch(err => {
        done(err, null);
      });
  });
};
