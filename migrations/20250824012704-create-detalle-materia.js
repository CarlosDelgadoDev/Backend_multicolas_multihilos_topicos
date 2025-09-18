'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Detalle_materia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      creditos: {
        type: Sequelize.INTEGER
      },
      planDeEstudioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Plan_de_estudios',
          key: 'id'
        },
      },
      materiaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Materias',
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
    await queryInterface.dropTable('Detalle_materia');
  }
};