'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Boleta_Inscripcions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaDeInscripcion: {
        type: Sequelize.DATE
      },
      estudianteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Estudiantes',
          key: 'id'
        },
      },
      periodoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Periodos',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Boleta_Inscripcions');
  }
};