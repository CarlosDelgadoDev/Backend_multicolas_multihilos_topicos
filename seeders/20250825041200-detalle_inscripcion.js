'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Detalle_Inscripcions', [
      {
        boletaInscripcionId: 1,  // ⚠️ asegúrate que exista en Boleta_Inscripcions
        grupoMateriaId: 1,      // ⚠️ asegúrate que exista en Grupo_Materias
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        boletaInscripcionId: 2,
        grupoMateriaId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        boletaInscripcionId: 1,
        grupoMateriaId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Detalle_Inscripcions', null, {});
  }
};
