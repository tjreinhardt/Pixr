'use strict';
const { User } = require('./user')

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User }
    },
    collectionId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    imageTitle: DataTypes.STRING,
    imageDescription: DataTypes.STRING
  }, {});
  Image.associate = function (models) {
    Image.belongsTo(models.User, { foreignKey: 'userId', hooks: true });
    // Image.belongsTo(models.Collection, {foreignKey: 'collectionId'})
  };
  return Image;
};
