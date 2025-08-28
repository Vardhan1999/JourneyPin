// Import Express
const express = require('express');

// Import body-parser to parse JSON requests
const bodyParser = require('body-parser');

// Import route handlers
const placesRoutes = require('./routes/places-routes');
const userrouters = require('./routes/users-routes');

// Create Express app
const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Mount routes
app.use('/api/places', placesRoutes);
app.use('/api/users', userrouters);

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
