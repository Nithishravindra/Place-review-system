require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const placeRoutes = require('./routes/place');
const ratingRoutes = require('./routes/rating');
const feedback = require('./routes/feedback');

// Remove this and put it in .env file.
process.env.JWT_SECRET = 'a_secret_aint_a_secret_when_git_pushed';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/places', placeRoutes);
app.use('/rating', ratingRoutes);
app.use('/feedback', feedback);

app.listen(3000, () => {
  console.log('Server running on port http://localhost:3000');
});
