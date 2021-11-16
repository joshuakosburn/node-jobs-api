// Load our config as soon as possible
require('dotenv').config({ path: './config.env' });
require('express-async-errors');

const express = require('express');
const app = express();

const connectToDB = require('./db/connect');

// ROUTERS
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');

// Error Handler Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// SETUP MIDDLEWARE
app.use(express.json());
// extra packages

// ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);

// SETUP ERROR HANDLER MIDDLEWARE
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URI).then(console.log("Database connected!"));
    app.listen(port, () => console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
