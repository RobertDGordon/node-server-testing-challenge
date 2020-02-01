function checkType(routeType) {
  return function(req, res, next) {
    console.log(req.user)
    if(req.user && req.user.type && req.user.type.toLowerCase() === routeType) {
      next();
    } else {
      res.status(403).json({ error: 'Incorrect user type!'})    
    }
  }
}

module.exports = checkType;