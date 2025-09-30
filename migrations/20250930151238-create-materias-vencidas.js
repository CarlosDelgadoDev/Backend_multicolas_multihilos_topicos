'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MateriasVencidas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estudianteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Estudiantes',
          key: 'id'
        },
      },
      materiaInscritaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Detalle_Inscripcions',
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
    await queryInterface.dropTable('MateriasVencidas');
  }
};