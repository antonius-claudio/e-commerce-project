const { Checkout } = require('../models');
class controllerTransactions {
    static getAll(req, res, next) {
        console.log('req.CustomerId ', req.CustomerId)
        let CustomerId = req.CustomerId;
        Checkout.findAll({
            where: {
                CustomerId
            },
            include: ['Customer']
        })
            .then((result) => {   
                res.status(200).json(result);
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = controllerTransactions;