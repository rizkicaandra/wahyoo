'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      balanceHistory: {
        type: Sequelize.INTEGER
      },
      ClientId: {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Clients',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      AccountId: {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Accounts',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};