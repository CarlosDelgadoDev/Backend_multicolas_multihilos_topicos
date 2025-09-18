'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Boleta_Inscripcions', [
      {
        fechaDeInscripcion: new Date('2025-01-15'),
        estudianteId: 1, // ⚠️ asegúrate que exista
        periodoId: 1,    // ⚠️ asegúrate que exista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaDeInscripcion: new Date('2025-08-10'),
        estudianteId: 2,
        periodoId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Boleta_Inscripcions', null, {});
  }
};
