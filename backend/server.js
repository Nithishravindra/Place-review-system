require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user');
const placeRoutes = require('./routes/place');
const ratingRoutes = require('./routes/rating');
const feedback = require('./routes/feedback');
const placeComment = require('./routes/comment');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/places', placeRoutes);
app.use('/rating', ratingRoutes);
app.use('/feedback', feedback);
app.use('/comment', placeComment);

app.listen(3000, () => {
  console.log('Server running on port http://localhost:3000');
});