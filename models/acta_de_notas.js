'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Acta_de_notas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Acta_de_notas.belongsTo(models.Docente, { foreignKey: 'docenteId' });
  Acta_de_notas.belongsTo(models.Periodo, { foreignKey: 'periodoId' });
  Acta_de_notas.hasMany(models.Detalle_de_notas, { foreignKey: 'actaDeNotasId' });
    }
  }
  Acta_de_notas.init({
    fecha: DataTypes.DATE,
    docenteId: DataTypes.INTEGER,
    periodoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Acta_de_notas',
  });
  return Acta_de_notas;
};