'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define('Checkout', {
    date: DataTypes.DATEONLY,
    CustomerId: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize
  });
  Checkout.associate = function(models) {
    // associations can be defined here
    Checkout.belongsTo(models.Customer);
    Checkout.hasMany(models.CheckoutProduct);
  };
  return Checkout;
};