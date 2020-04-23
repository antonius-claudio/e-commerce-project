const { CheckoutProduct } = require('../models');
class controllerCheckoutProduct {
    static getAll (req, res, next) {
        let CheckoutId = req.params.id;
        CheckoutProduct.findAll({
            where: {
                CheckoutId
            }
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = controllerCheckoutProduct;