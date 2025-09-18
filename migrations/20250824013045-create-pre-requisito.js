'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pre_requisitos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      materiaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Materias',
          key: 'id'
        },
      },
      prerequisitoId: {
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
    await queryInterface.dropTable('Pre_requisitos');
  }
};