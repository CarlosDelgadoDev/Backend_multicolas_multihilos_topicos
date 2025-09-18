'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Detalle_carrera_cursadas', [
      {
        fechaInscripcion: new Date('2024-02-10'),
        estudianteId: 1,       // ⚠️ Asegúrate que exista
        planDeEstudioId: 1,    // ⚠️ Asegúrate que exista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaInscripcion: new Date('2024-08-15'),
        estudianteId: 2,
        planDeEstudioId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Detalle_carrera_cursadas', null, {});
  }
};
