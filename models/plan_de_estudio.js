'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan_de_estudio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Plan_de_estudio.belongsTo(models.Carrera, { foreignKey: 'carreraId' });
  Plan_de_estudio.hasMany(models.Detalle_materia, { foreignKey: 'planDeEstudioId' });
  Plan_de_estudio.hasMany(models.Detalle_carrera_cursadas, { foreignKey: 'planDeEstudioId' });
    }
  }
  Plan_de_estudio.init({
    nombre: DataTypes.STRING,
    tipoPeriodo: DataTypes.STRING,
    modalidad: DataTypes.STRING,
    codigo: DataTypes.STRING,
    carreraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plan_de_estudio',
  });
  return Plan_de_estudio;
};