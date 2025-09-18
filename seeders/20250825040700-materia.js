'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Materias', [
      {
        nombre: 'Programación I',
        horasDeEstudio: 60,
        sigla: 'INF-101',
        nivel: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Matemática I',
        horasDeEstudio: 50,
        sigla: 'MAT-101',
        nivel: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Estructuras de Datos',
        horasDeEstudio: 70,
        sigla: 'INF-201',
        nivel: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Bases de Datos',
        horasDeEstudio: 65,
        sigla: 'INF-202',
        nivel: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Materias', null, {});
  }
};
