const { Customer, Cart } = require('../models');
function authorization(req, res, next) {
    let idCart = req.body.id;
    Cart.findByPk(idCart)
        .then((result) => {
            if (result) {
                if (result.CustomerId === req.CustomerId) {
                    next();
                } else {
                    throw { msg:'Not authorized', status:401 };
                }
            } else {
                throw { msg:'Cart Not Found!', status:404 };
            }
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = authorization