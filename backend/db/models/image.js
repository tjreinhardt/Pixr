'use strict';
// const { User } = require('./user')

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER,
    imageUrl: DataTypes.TEXT,
    imageTitle: DataTypes.STRING,
    imageDescription: DataTypes.TEXT
  }, {});
  Image.associate = function (models) {
    Image.belongsTo(models.User, { foreignKey: 'userId', hooks: true });
    // Image.belongsTo(models.Collection, {foreignKey: 'collectionId'})
  };
  return Image;
};
