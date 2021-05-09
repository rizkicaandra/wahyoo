'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    category: {
      type : DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    amount: {
      type : DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    balanceHistory: {
      type : DataTypes.INTEGER,
      validate:{
        notEmpty: true
      }
    },
    ClientId: {
      type : DataTypes.INTEGER,
      validate:{
        notEmpty: true
      }
    },
    AccountId: {
      type : DataTypes.INTEGER,
      validate:{
        notEmpty: true
      }
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};