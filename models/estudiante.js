'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Estudiante.hasMany(models.Detalle_carrera_cursadas, { foreignKey: 'estudianteId' });
  Estudiante.hasMany(models.Boleta_Inscripcion, { foreignKey: 'estudianteId' });
  Estudiante.hasMany(models.MateriasVencidas, { foreignKey: 'estudianteId' });
    }
  }
  Estudiante.init({
    registro: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    apellidoPaterno: DataTypes.STRING,
    apellidoMaterno: DataTypes.STRING,
    ci: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE,
    nacionalidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estudiante',
  });
  return Estudiante;
};