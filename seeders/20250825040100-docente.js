'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Docentes', [
      {
        nombre: 'Juan',
        apellidoPaterno: 'Martínez',
        apellidoMaterno: 'Rojas',
        ci: '11223344',
        fechaNac: new Date('1980-03-10'),
        profesion: 'Ingeniero de Sistemas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'María',
        apellidoPaterno: 'Fernández',
        apellidoMaterno: 'Gómez',
        ci: '44332211',
        fechaNac: new Date('1975-07-22'),
        profesion: 'Licenciada en Filosofía',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Docentes', null, {});
  }
};
