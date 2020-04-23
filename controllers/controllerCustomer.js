const { Customer } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jwt');

class controllerCustomer {
    static register (req, res, next) {
        let form = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone
        }
        Customer.findOne({
            where: {
                email: form.email
            }
        })
            .then((result) => {
                if (result) {
                    throw {status:401, msg: 'Email already used!'};
                } else {
                    return Customer.create(form);
                }
            })
            .then((result) => {
                let access_token = sign({
                    CustomerId: result.id,
                    CustomerEmail: result.email
                })
                res.status(201).json({access_token, 
                    email:result.email, 
                    name:result.name, 
                    address:result.address, 
                    phone:result.phone});
            })
            .catch((err) => {
                next(err);
            });
    }

    static login (req, res, next) {
        let form = {
            email: req.body.email,
            password: req.body.password
        }
        let errors = [];
        if (form.email === undefined || form.email === '' || form.email === null) {
            errors.push({message: 'Email is required!'});
        }
        if (form.password === undefined || form.password === '' || form.password === null) {
            errors.push({message: 'password is required!'});
        }
        if (errors.length === 0) {
            Customer.findOne({
                where: {
                    email: form.email
                }
            })
                .then((result) => {
                    if (result) {
                        console.log('loginnnnn', result.email)
                        if (compare(form.password, result.password)) {
                            let access_token = sign({
                                CustomerId: result.id,
                                CustomerEmail: result.email
                            })
                            res.status(200).json({access_token, 
                                email:result.email, 
                                name:result.name, 
                                address:result.address, 
                                phone:result.phone});
                        } else {
                            throw {status:401, msg: 'Password invalid!'};
                        }
                    } else {
                        throw {msg: 'Email not found!'};
                    }
                })
                .catch((err) => {
                    console.log('error', err)
                    next(err);
                });
        } else {
            throw {errors};
        }
    }
}

module.exports = controllerCustomer