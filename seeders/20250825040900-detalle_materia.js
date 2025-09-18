'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Detalle_materia', [
      {
        creditos: 5,
        planDeEstudioId: 1,  // Asegúrate de que este ID exista en tu tabla Plan_de_estudios
        materiaId: 1,        // Asegúrate de que este ID exista en tu tabla Materias
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creditos: 4,
        planDeEstudioId: 1,
        materiaId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creditos: 6,
        planDeEstudioId: 2,
        materiaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Detalle_materia', null, {});
  }
};
