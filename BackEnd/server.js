require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const placeRoutes = require('./routes/place');
const ratingRoutes = require('./routes/rating');
const feedback = require('./routes/feedback');
const cors = require("cors");
const session = require('express-session')

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use("/users", userRoutes);
app.use("/places",placeRoutes);
app.use("/rating",ratingRoutes);
app.use("/feedback", feedback);

app.listen(3000, () => {console.log('Server running on port 3000')});
