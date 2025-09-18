'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Horarios', [
      {
        dia: 'Lunes',
        inicio: '08:00',
        final: '10:00',
        aulaId: 1,
        grupoMateriaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dia: 'Miércoles',
        inicio: '10:00',
        final: '12:00',
        aulaId: 2,
        grupoMateriaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Horarios', null, {});
  }
};
