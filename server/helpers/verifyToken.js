const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
  const token = req.headers['authorization'];

  if(!token) return res.status(401).send('Access Denied!');

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET.toString(), (err, user) => {

      if(err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}
