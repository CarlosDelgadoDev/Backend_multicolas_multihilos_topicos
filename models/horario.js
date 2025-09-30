'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Horario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Relación muchos a muchos con Aula a través de AulaHorario
      Horario.belongsToMany(models.Aula, {
        through: models.AulaHorario,
        foreignKey: 'horarioId'
      });
    }
  }
  Horario.init({
    inicio: DataTypes.TIME,
    final: DataTypes.TIME,
    dia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Horario',
  });
  return Horario;
};