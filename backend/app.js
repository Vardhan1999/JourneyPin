const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const userrouters = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());
app.use('/api/places', placesRoutes);
app.use('/api/users', userrouters)

app.listen(3000, () => {
    console.log('Server running on port 3000');
});