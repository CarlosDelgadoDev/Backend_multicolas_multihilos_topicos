'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Carrera.belongsTo(models.Facultad, { foreignKey: 'facultadId' });
  Carrera.hasMany(models.Plan_de_estudio, { foreignKey: 'carreraId' });
    }
  }
  Carrera.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    sigla: DataTypes.STRING,
    facultadId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carrera',
  });
  return Carrera;
};