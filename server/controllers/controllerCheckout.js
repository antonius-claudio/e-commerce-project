const { Cart, Product, Checkout, CheckoutProduct } = require('../models');

class controllerCheckout {
    static checkout (req, res, next) {
        // console.log('masuk cheeeee', JSON.parse(req.body.payload, null, 2))
        let payload = JSON.parse(req.body.payload, null, 2);
        let formCheckout = {
            date: new Date(),
            CustomerId: req.CustomerId,
            total: payload.total
        };
        let test =  [{
            CheckoutId: 5,
            name: 'test',
            price: 123,
            quantity: 1
        },{
            CheckoutId: 5,
            name: 'test',
            price: 123,
            quantity: 1
        },{
            CheckoutId: 5,
            name: 'test',
            price: 123,
            quantity: 1
        }];
        
        Checkout.create(formCheckout)
            .then((result) => {
                let formCheckoutProduct = [];
                payload.cart.forEach(i => {
                    formCheckoutProduct.push({
                        CheckoutId: Number(result.id),
                        name: String(i.name),
                        price: Number(i.price),
                        quantity: Number(i.quantity)
                    });
                })
                console.log('form', formCheckoutProduct)
                console.log('form', test)
                return CheckoutProduct.bulkCreate(formCheckoutProduct, {returning: true})
            })
            .then((result) => {
                console.log('berhasil2')
                payload.cart.forEach(i => {
                    Product.update({stock:i.stock}, {
                        where: {
                            id: i.ProductId
                        }
                    })
                        .then((result) => {
                            console.log('sukses update');
                        })
                        .catch((err) => {
                            console.log('gagal update', err);
                            next(err);
                        });
                })
                Cart.destroy({
                    where: {
                        CustomerId: Number(req.CustomerId)
                    }
                })
                    .then((result) => {
                        console.log('masuk delete')
                        res.status(200).json({message: 'Success checkout'})
                    })
                    .catch((err) => {
                        console.log('gagal', err)
                        next(err);
                    });
            })
            .catch((err) => {
                console.log('gagal', err)
                next(err);
            });
    }
}
module.exports = controllerCheckout;