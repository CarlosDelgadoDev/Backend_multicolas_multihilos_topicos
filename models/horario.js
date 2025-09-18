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
  Horario.belongsTo(models.Grupo_Materia, { foreignKey: 'grupoMateriaId' });
  Horario.belongsTo(models.Aula, { foreignKey: 'aulaId' });
    }
  }
  Horario.init({
    inicio: DataTypes.TIME,
    final: DataTypes.TIME,
    dia: DataTypes.STRING,
    grupoMateriaId: DataTypes.INTEGER,
    aulaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Horario',
  });
  return Horario;
};