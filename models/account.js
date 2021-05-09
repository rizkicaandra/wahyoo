'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Client, { foreignKey: 'ClientId'})
      Account.belongsToMany(models.Client, { through: models.Transaction, foreignKey: 'AccountId'})
    }
  };
  Account.init({
    balance: {
      type : DataTypes.STRING,
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
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};