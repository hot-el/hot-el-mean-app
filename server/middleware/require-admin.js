const httpError = require('http-errors');

const requireAdmin = function (req, res, next) {
  if (req.user && req.user.roles.indexOf('Admin') > -1) 
    return next();
  const err = new httpError(401);
  return next(err);
}

module.exports = requireAdmin;
