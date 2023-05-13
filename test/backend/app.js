// app.js

const express = require('express');
const app = express();
const middleware = require('./middleware');

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Middleware functions
app.use(middleware.logger);
app.use(middleware.authenticate);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
