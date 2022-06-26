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
        imageTitle: "Look at this pizookie I made",
        imageUrl: "https://sugarspunrun.com/wp-content/uploads/2021/11/Pizookie-recipe-1-of-1-2.jpg",
        imageDescription: "I love pizookies :O",
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
