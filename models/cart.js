'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'ProductId is required!'
        },
        notNull: {
          msg: 'ProductId is required!'
        }
      }
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'CustomerId is required!'
        },
        notNull: {
          msg: 'CustomerId is required!'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'quantity is required!'
        },
        notNull: {
          msg: 'quantity is required!'
        }
      }
    }
  }, {
    sequelize
  });
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Customer)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};