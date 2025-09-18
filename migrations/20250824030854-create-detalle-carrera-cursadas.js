'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Detalle_carrera_cursadas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaInscripcion: {
        type: Sequelize.DATE
      },
      estudianteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Estudiantes',
          key: 'id'
        },
      },
      planDeEstudioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Plan_de_estudios',
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
    await queryInterface.dropTable('Detalle_carrera_cursadas');
  }
};