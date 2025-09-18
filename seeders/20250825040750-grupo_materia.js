'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Grupo_Materias', [
      {
        sigla: 'Grupo A',
        docenteId: 1,
        materiaId: 1,
        periodoId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sigla: 'Grupo B',
        docenteId: 2,
        materiaId: 2,
        periodoId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Grupo_Materias', null, {});
  }
};
