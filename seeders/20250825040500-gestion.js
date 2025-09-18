'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Gestions', [
      {
        año: 2025,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        año: 2024,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Gestions', null, {});
  }
};
