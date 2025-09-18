'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Grupo_Materias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sigla: {
        type: Sequelize.STRING
      },
      materiaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Materias',
          key: 'id'
        },
      },
      docenteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Docentes',
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
    await queryInterface.dropTable('Grupo_Materias');
  }
};