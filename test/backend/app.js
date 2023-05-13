const express = require('express');
const app = express();
const middleware = require('./middleware');

// Register middleware functions
app.use(middleware.logger);
app.use(middleware.authenticate);

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
