/* eslint-disable no-console */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('./models');

module.exports = (app) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne(
        { username },
        async (err, user) => {
          if (err) {
            console.error(err);
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          if (!await bcrypt.compare(password, user.password)) {
            return done(null, false);
          }
          return done(null, user);
        },
      );
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne(
      { _id: id },
      '-password',
      (err, foundUser) => {
        done(null, foundUser);
      },
    );
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
