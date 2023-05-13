const User = require('./models/user');

passport.use(new LocalStrategy(
  {
    usernameField: 'email', // name for the username in the request body
    passwordField: 'password', // password in the request body
  },
  async (email, password, done) => {
    try {
      // Check if the user exists in the database
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false); // User not found, authentication failed
      }

      // Verify the password
      const isPasswordValid = await user.verifyPassword(password);

      if (!isPasswordValid) {
        return done(null, false); // incorrect, authentication failed
      }

      return done(null, user); // authentication successful
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  // Store the user ID in the session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Retrieve the user by ID from the database
    const user = await User.findById(id);

    if (!user) {
      return done(null, false); // User not found
    }

    // User found, pass the user object to the next middleware
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
