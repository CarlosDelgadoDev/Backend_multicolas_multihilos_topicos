'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plan_de_estudios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      tipoPeriodo: {
        type: Sequelize.STRING
      },
      modalidad: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING,
        unique: true
      },
      carreraId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Carreras',
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
    await queryInterface.dropTable('Plan_de_estudios');
  }
};