// Import Express
const express = require('express');

// Import route handlers
const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

// Create Express app
const app = express();

// Parse JSON bodies
app.use(express.json());

// Mount routes
app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || 'An unknown error occurred!' });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
