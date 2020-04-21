const { Cart, Product } = require('../models');
const { Op } = require('../models').Sequelize;
class controllerCart {
    static getCart (req, res, next) {
        Cart.findAll({
            where: {
                CustomerId: req.CustomerId
            }
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                next(err);
            });
    }

    static addCart (req, res, next) {
        let form = {
            CustomerId: req.CustomerId,
            ProductId: req.body.ProductId,
            quantity: Number(req.body.quantity)
        }
        let idFindOne = null;
        Product.findByPk(form.ProductId)
            .then((result) => {
                if (!result) {
                    throw { msg:'Product not found!', status:404 }
                } else {
                    Cart.findOne({
                        where: {
                            [Op.and] : [
                                {CustomerId: form.CustomerId},
                                {ProductId: form.ProductId}
                            ]
                        }
                    })
                        .then((result) => {
                            if (result) {
                                idFindOne = result.id;
                                Cart.update({quantity: (result.quantity + form.quantity)}, {
                                    where: {
                                        id: idFindOne
                                    }
                                })
                                    .then((result) => {
                                        Cart.findByPk(idFindOne)
                                            .then((result) => {
                                                res.status(200).json(result);
                                            })
                                            .catch((err) => {
                                                next(err);
                                            });
                                    })
                                    .catch((err) => {
                                        next(err);
                                    });
                            } else {
                                Cart.create(form)
                                    .then((result) => {
                                        res.status(201).json(result);
                                    })
                                    .catch((err) => {
                                        next(err);
                                    })
                            }
                        })
                        .catch((err) => {
                            next(err);
                        });
                }
            })
            .catch((err) => {
                next(err);
            });
    }

    static updateCart (req, res, next) {
        let form = {
            CustomerId: req.CustomerId,
            id: req.body.id,
            quantity: Number(req.body.quantity)
        }
        return Cart.update({quantity: form.quantity}, {
            where: {
                id: form.id
            }
        })
            .then((result) => {
                return Cart.findByPk(form.id)
            })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                next(err);
            });
    }

    static deleteCart (req, res, next) {
        let CustomerId = req.CustomerId;
        Cart.destroy({
            where: {
                CustomerId
            }
        })
            .then((result) => {
                res.status(200).json({message: "Successfully delete"});
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = controllerCart;