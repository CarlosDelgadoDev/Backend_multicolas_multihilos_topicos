'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Estudiantes', [
      {
        nombre: 'Carlos',
        apellidoPaterno: 'García',
        apellidoMaterno: 'López',
        ci: '12345678',
        fechaNacimiento: new Date('2000-01-01'),
        nacionalidad: 'Boliviana',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Ana',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'Soto',
        ci: '87654321',
        fechaNacimiento: new Date('2001-05-15'),
        nacionalidad: 'Boliviana',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Estudiantes', null, {});
  }
};
