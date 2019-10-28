const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const placeRoutes = require('./routes/place');
const ratingRoutes = require('./routes/rating');

var app = express();

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/places",placeRoutes);
app.use("/rating",ratingRoutes)

app.listen(3005);
