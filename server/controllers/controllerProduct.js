const { Product } = require('../models');
const { Op } = require('../models').Sequelize;

class controllerProduct {
    static getAll (req, res, next) {
        Product.findAll({
            where: {
                stock: {
                    [Op.not]: 0
                }
            }
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                next(err);
            });
    }

    static updateStock (req, res, next) {
        let form = {
            stock: req.body.stock
        }
        let id = req.params.id;
        Product.findOne({
            where: {
                id
            }
        })
            .then((result) => {
                if (result) {
                    let newStock = {
                        stock: result.stock - form.stock
                    }
                    return Product.update(newStock, {
                        where: {
                            id
                        }
                    })
                } else {
                    throw { msg: 'Product id not found!', status:404 };
                }
            })
            .then((result) => {
                return Product.findOne({
                    where: {
                        id
                    }
                })
            })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                next(err)
            });

    }
}

module.exports = controllerProduct;