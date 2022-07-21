
'use strict';
module.exports = (sequelize, DataTypes) => {
  const JoinImageCollection = sequelize.define(
    'JoinImageCollection',
    {
      imageId: { type: DataTypes.INTEGER, allowNull: false },
      collectionId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  JoinImageCollection.associate = function (models) {
    // associations can be defined here
  };
  return JoinImageCollection;
};
