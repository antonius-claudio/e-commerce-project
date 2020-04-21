const { User } = require('../models');
function authorization(req, res, next) {
    User.findByPk(req.UserId)
    .then((result) => {
        if (result.role === 'Administrator') {
            next();
        } else {
            throw {msg: `You'r not Admin`, status: 401}
        }
    })
    .catch((err) => {
        next(err);
    });
}

module.exports = authorization