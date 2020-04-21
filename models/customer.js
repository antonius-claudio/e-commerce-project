'use strict';
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required!'
        },
        notNull: {
          msg: 'Email is required!'
        },
        isEmail: {
          msg: 'Must email format!'
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required!'
        },
        notNull: {
          msg: 'Password is required!'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required!'
        },
        notNull: {
          msg: 'Name is required!'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Address is required!'
        },
        notNull: {
          msg: 'Address is required!'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone is required!'
        },
        notNull: {
          msg: 'Phone is required!'
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (model, options) => {
        model.status = 'active';
        model.password = hash(model.password);
      },
    }
  });
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.hasMany(models.Cart)
  };
  return Customer;
};