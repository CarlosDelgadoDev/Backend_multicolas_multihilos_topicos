'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Detalle_de_notas', [
      {
        puntaje: 85,
        actaDeNotasId: 1,         // Asegúrate que exista en Acta_de_notas
        detalleInscripcionId: 1,  // Asegúrate que exista en Detalle_Inscripcions
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        puntaje: 92,
        actaDeNotasId: 2,
        detalleInscripcionId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Detalle_de_notas', null, {});
  }
};
