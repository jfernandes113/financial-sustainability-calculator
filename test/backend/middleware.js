// middleware.js

const logger = (req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    next();
  };
  