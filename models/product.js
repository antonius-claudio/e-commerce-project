'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    image_url: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize
  });
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Cart)
  };
  return Product;
};