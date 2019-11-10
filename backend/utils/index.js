// const getToken = headers => {
//   // We're spliting the text 'Bearer' and the actual token from the string.
//   return headers.authorization.split(' ')[0];
// };

const isAuthorized = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  // const token = getToken(req.headers); 
  const token = req.cookies.token
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err.message);
      res.send(err);
    }
    console.log(decoded)
    const {userID} = decoded;

    if (userID) {
      req.userID = userID;
      next();
    } else {
      res.send({error: {message: 'Token is invalid!'}});
    }
  });
};

module.exports = {
  
  isAuthorized
};
