'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AulaHorario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AulaHorario.belongsTo(models.Aula, { foreignKey: 'aulaId' });
      AulaHorario.belongsTo(models.Horario, { foreignKey: 'horarioId' });
      AulaHorario.belongsTo(models.Grupo_Materia, { foreignKey: 'grupoMateriaId' });
    }
  }
  AulaHorario.init({
    aulaId: DataTypes.INTEGER,
    horarioId: DataTypes.INTEGER,
    grupoMateriaId: DataTypes.INTEGER,
    dia: DataTypes.STRING,
    horaInicio: DataTypes.TIME,
    horaFin: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'AulaHorario',
  });
  return AulaHorario;
};