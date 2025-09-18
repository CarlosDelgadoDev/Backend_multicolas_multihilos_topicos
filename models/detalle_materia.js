'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle_materia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Detalle_materia.belongsTo(models.Plan_de_estudio, { foreignKey: 'planDeEstudioId' });
  Detalle_materia.belongsTo(models.Materia, { foreignKey: 'materiaId' });
    }
  }
  Detalle_materia.init({
    creditos: DataTypes.INTEGER,
    planDeEstudioId: DataTypes.INTEGER,
    materiaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detalle_materia',
  });
  return Detalle_materia;
};