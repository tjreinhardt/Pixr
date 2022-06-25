'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    imageTitle: DataTypes.STRING,
    imageDescription: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.User, {foreignKey: 'userId'});
    // Image.belongsTo(models.Collection, {foreignKey: 'collectionId'})
  };
  return Image;
};
