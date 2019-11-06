const getToken = headers => {
  // We're spliting the text 'Bearer' and the actual token from the string.
  return headers.authorization.split(' ')[1];
};

const isAuthorized = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const token = getToken(req.headers);
  console.log('[DEBUG] TOKEN:', token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err.message);
      res.send(err);
    }
    const {user} = decoded;
    console.log('[DEBUG] Decoded:', decoded);

    if (user) {
      req.user = user;
      next();
    } else {
      res.send({message: 'Token is invalid!'});
    }
  });
};

module.exports = {
  getToken,
  isAuthorized
};
