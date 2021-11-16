// Load our config as soon as possible
require('dotenv').config({ path: './config.env' });
require('express-async-errors');
const express = require('express');
const app = express();

const connectToDB = require('./db/connect');

// Error Handler Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// SETUP MIDDLEWARE
app.use(express.json());
// extra packages

// ROUTES
app.get('/', (req, res) => {
  res.send('jobs api');
});

// SETUP ERROR HANDLER MIDDLEWARE
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectToDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
