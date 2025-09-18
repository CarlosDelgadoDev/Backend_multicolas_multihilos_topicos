'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Periodo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Periodo.belongsTo(models.Gestion, { foreignKey: 'gestionId' });
  Periodo.hasMany(models.Grupo_Materia, { foreignKey: 'periodoId' });
  Periodo.hasMany(models.Boleta_Inscripcion, { foreignKey: 'periodoId' });
  Periodo.hasMany(models.Acta_de_notas, { foreignKey: 'periodoId' });
    }
  }
  Periodo.init({
    numero: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    nombre: DataTypes.STRING,
    gestionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Periodo',
  });
  return Periodo;
};