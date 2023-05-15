const express = require('express');
const app = express();
const middleware = require('./middleware');
const passport = require('./passport');
const nodemailer = require('nodemailer');

// Register middleware functions
app.use(middleware.logger);
app.use(middleware.authenticate);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  // Authentication successful, handle the response here
  res.send('Authentication successful');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jf1352582@gmail.com',
    pass: 'thebridge2023'
  }
});

// Send email
app.get('/send-email', (req, res) => {
  const mailOptions = {
    from: 'jf1352582@gmail.com',
    to: 'jf1352582@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email from Nodemailer.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.send('Error sending email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully.');
    }
  });
});
