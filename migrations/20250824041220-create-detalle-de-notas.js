'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Detalle_de_notas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      puntaje: {
        type: Sequelize.INTEGER
      },
      actaDeNotasId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Acta_de_notas',
          key: 'id'
        },
      },
      detalleInscripcionId: {
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
    await queryInterface.dropTable('Detalle_de_notas');
  }
};