'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle_de_notas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Detalle_de_notas.belongsTo(models.Acta_de_notas, { foreignKey: 'actaDeNotasId' });
  Detalle_de_notas.belongsTo(models.Detalle_Inscripcion, { foreignKey: 'detalleInscripcionId' });
    }
  }
  Detalle_de_notas.init({
    puntaje: DataTypes.INTEGER,
    actaDeNotasId: DataTypes.INTEGER,
    detalleInscripcionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detalle_de_notas',
  });
  return Detalle_de_notas;
};