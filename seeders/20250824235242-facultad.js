'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Facultads', [
      {
        nombre: 'Facultad de Ingeniería en Ciencias de la Computación y Telecomunicaciones',
        descripcion: 'Forma ingenieros en computación y telecomunicaciones con enfoque tecnológico y de innovación.',
        sigla: 'FICCT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Facultad de Ciencias Humanas',
        descripcion: 'Dedicada a las ciencias sociales, filosofía, literatura y desarrollo humano.',
        sigla: 'FCH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Facultad Politécnica',
        descripcion: 'Ofrece carreras técnicas y prácticas en diversas áreas del conocimiento aplicado.',
        sigla: 'FPOLI',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
