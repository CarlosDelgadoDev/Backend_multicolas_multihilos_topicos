'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero obtenemos algunos IDs existentes de estudiantes y detalles de inscripción
    const estudiantes = await queryInterface.sequelize.query(
      `SELECT id FROM "Estudiantes" LIMIT 2;`
    );

    const detallesInscripcion = await queryInterface.sequelize.query(
      `SELECT id FROM "Detalle_Inscripcions" LIMIT 2;`
    );

    const estudianteIds = estudiantes[0].map(e => e.id);
    const detalleInscripcionIds = detallesInscripcion[0].map(d => d.id);

    await queryInterface.bulkInsert('MateriasVencidas', [
      {
        estudianteId: estudianteIds[0],
        materiaInscritaId: detalleInscripcionIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        estudianteId: estudianteIds[1],
        materiaInscritaId: detalleInscripcionIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MateriasVencidas', null, {});
  }
};
