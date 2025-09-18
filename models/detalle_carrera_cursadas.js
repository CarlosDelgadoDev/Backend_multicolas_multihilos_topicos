'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle_carrera_cursadas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Detalle_carrera_cursadas.belongsTo(models.Estudiante, { foreignKey: 'estudianteId' });
  Detalle_carrera_cursadas.belongsTo(models.Plan_de_estudio, { foreignKey: 'planDeEstudioId' });
    }
  }
  Detalle_carrera_cursadas.init({
    fechaInscripcion: DataTypes.DATE,
    estudianteId: DataTypes.INTEGER,
    planDeEstudioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detalle_carrera_cursadas',
  });
  return Detalle_carrera_cursadas;
};