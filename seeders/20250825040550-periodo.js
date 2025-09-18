'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Periodos', [
      {
        numero: 1,
        descripcion: 'Primer semestre 2025',
        nombre: '2025-1',
        gestionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        numero: 2,
        descripcion: 'Segundo semestre 2025',
        nombre: '2025-2',
        gestionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Periodos', null, {});
  }
};
