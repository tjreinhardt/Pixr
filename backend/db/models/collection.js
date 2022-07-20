'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Collection.associate = function (models) {
    Collection.belongsTo(models.User, { foreignKey: 'userId' });
    Collection.belongsToMany(models.Image, {
      through: "JoinImageCollection",
      foreignKey: 'imageId',
      otherKey: 'collectionId'
    })
  };
  return Collection;
};
