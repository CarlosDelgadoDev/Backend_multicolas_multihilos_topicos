'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Aula.belongsTo(models.Modulo, { foreignKey: 'moduloId' });
  Aula.hasMany(models.Horario, { foreignKey: 'aulaId' });
    }
  }
  Aula.init({
    numero: DataTypes.INTEGER,
    capacidad: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    moduloId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Aula',
  });
  return Aula;
};