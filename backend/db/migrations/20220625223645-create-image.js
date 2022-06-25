'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      collectionId: {
        type: Sequelize.INTEGER,
        unique: true
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imageTitle: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      imageDescription: {
        type: Sequelize.STRING(150),
        allowNull: false
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
