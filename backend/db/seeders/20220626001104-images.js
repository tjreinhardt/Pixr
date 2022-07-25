'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        imageTitle: "I told them I was lost",
        imageUrl: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/28/12/pyramid-crop1.jpg?quality=75&width=982&height=726&auto=webp",
        imageDescription: "But we all know I'm not supposed to be up here",
        lat: 29.9792,
        lng: 31.1342
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Images', null, {});
  }
};
