'use strict';
module.exports = (sequelize, DataTypes) => {
  const CheckoutProduct = sequelize.define('CheckoutProduct', {
    CheckoutId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize
  });
  CheckoutProduct.associate = function(models) {
    // associations can be defined here
    CheckoutProduct.belongsTo(models.Checkout);
  };
  return CheckoutProduct;
};