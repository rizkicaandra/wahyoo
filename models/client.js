'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Client.hasOne(models.Account, { foreignKey: 'ClientId'})
      Client.belongsToMany(models.Account, { through: models.Transaction, foreignKey: 'ClientId'})
    }
  };
  Client.init({
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true,
      },
      unique: true
    },
    password: {
      type : DataTypes.STRING,
      validate:{
        notEmpty: true,
        len: [6,50]
      }
    },
  }, {
    sequelize,
    modelName: 'Client',
    hooks:{
      beforeCreate: (client, opt) => {
        client.password = hashPass(client.password)
      }
    }
  });
  return Client;
};