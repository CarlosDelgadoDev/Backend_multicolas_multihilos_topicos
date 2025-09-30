'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AulaHorarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aulaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Aulas',
          key: 'id'
        },
      },
      horarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Horarios',
          key: 'id'
        },
      },
      grupoMateriaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Grupo_Materias',
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
    await queryInterface.dropTable('AulaHorarios');
  }
};