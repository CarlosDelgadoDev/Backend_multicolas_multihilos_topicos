'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Detalle_Inscripcions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      boletaInscripcionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Boleta_Inscripcions',
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
    await queryInterface.dropTable('Detalle_Inscripcions');
  }
};