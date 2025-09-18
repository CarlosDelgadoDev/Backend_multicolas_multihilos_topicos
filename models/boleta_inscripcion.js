'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boleta_Inscripcion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Boleta_Inscripcion.belongsTo(models.Estudiante, { foreignKey: 'estudianteId' });
  Boleta_Inscripcion.belongsTo(models.Periodo, { foreignKey: 'periodoId' });
  Boleta_Inscripcion.hasMany(models.Detalle_Inscripcion, { foreignKey: 'boletaInscripcionId' });
    }
  }
  Boleta_Inscripcion.init({
    fechaDeInscripcion: DataTypes.DATE,
    estudianteId: DataTypes.INTEGER,
    periodoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Boleta_Inscripcion',
  });
  return Boleta_Inscripcion;
};