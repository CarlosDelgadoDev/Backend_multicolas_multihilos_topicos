'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Docente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Docente.hasMany(models.Grupo_Materia, { foreignKey: 'docenteId' });
  Docente.hasMany(models.Acta_de_notas, { foreignKey: 'docenteId' });
    }
  }
  Docente.init({
    nombre: DataTypes.STRING,
    apellidoPaterno: DataTypes.STRING,
    apellidoMaterno: DataTypes.STRING,
    ci: DataTypes.STRING,
    fechaNac: DataTypes.DATE,
    profesion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Docente',
  });
  return Docente;
};