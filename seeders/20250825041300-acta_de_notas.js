'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Acta_de_notas', [
      {
        fecha: new Date('2025-08-15'),
        docenteId: 1,   // ⚠️ Asegúrate de que este ID exista en Docentes
        periodoId: 2,   // ⚠️ Asegúrate de que este ID exista en Periodos
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fecha: new Date('2025-08-20'),
        docenteId: 2,
        periodoId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Acta_de_notas', null, {});
  }
};
