const router = require('express').Router();
const controllerCart = require('../controllers/controllerCart');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);

router.get('/', controllerCart.getCart);

router.post('/', controllerCart.addCart);

router.put('/', authorization, controllerCart.updateCart);

router.delete('/', controllerCart.deleteCart);

module.exports = router;