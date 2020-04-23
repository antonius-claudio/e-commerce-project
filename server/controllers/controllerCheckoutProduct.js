const { CheckoutProduct } = require('../models');
class controllerCheckoutProduct {
    static getAll (req, res, next) {
        console.log('thiiiss', req.params.id)
        let CheckoutId = req.params.id;
        CheckoutProduct.findAll({
            where: {
                CheckoutId
            }
        })
            .then((result) => {
                console.log('theen', result)
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log('errrr', err)
                next(err);
            });
    }
}

module.exports = controllerCheckoutProduct;