'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Aulas', [
      {
        numero: 101,
        capacidad: 40,
        tipo: 'Teórica',
        moduloId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        numero: 202,
        capacidad: 30,
        tipo: 'Laboratorio',
        moduloId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Aulas', null, {});
  }
};
