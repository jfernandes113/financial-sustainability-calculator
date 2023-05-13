const logger = (req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    next();
  };
  
  const authenticate = (req, res, next) => {
    // Check if user is authenticated
    if (req.user) {
      next(); // User is authenticated, continue to the next middleware or route
    } else {
      res.status(401).send('Unauthorized'); // User is not authenticated, send an error response
    }
  };
  
  module.exports = { logger, authenticate };
  