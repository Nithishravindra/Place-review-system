require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user');
const placeRoutes = require('./routes/place');
const ratingRoutes = require('./routes/rating');
const feedback = require('./routes/feedback');
const placeComment = require('./routes/comment');
const revStar = require('./routes/revStar');
const app = express();
const localStorage = require('localStorage');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
process.env.JWT_SECRET = 'a_secret_aint_a_secret_when_git_pushed';


app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/places', placeRoutes);
app.use('/rating', ratingRoutes);
app.use('/feedback', feedback);
app.use('/comment', placeComment);
app.use('/revStar', revStar);



//const {isAuthorized} = require('./utils'); 
// app.get('/content', isAuthorized, function(req, res) {
//   // to add token from /login to  localStorage => userId
//   // localStorage.add(key , "user")
//   // console.log(req.sessionID())
//   localStorage.setItem('user_id', '21')
//   let x = localStorage.getItem('user_ic');
//   //console.log('in main page = ' + req.userID)
//   console.log('x == ', x)
//   res.send({message: "authro", userID: req.userID})
// })


// app.post('/logout', isAuthorized, function(req, res) {
//   //req.session
//   //localStorage.clear();
//   res.send('logout successfull')
// })

app.listen(3000, () => {
  console.log('Server running on port http://localhost:3000');
});
