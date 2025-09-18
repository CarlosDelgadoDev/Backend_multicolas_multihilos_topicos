'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Gestion.hasMany(models.Periodo, { foreignKey: 'gestionId' });
    }
  }
  Gestion.init({
    año: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Gestion',
  });
  return Gestion;
};