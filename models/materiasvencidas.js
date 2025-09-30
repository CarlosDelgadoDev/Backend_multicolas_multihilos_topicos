'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MateriasVencidas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MateriasVencidas.belongsTo(models.Estudiante, { foreignKey: 'estudianteId' });
      MateriasVencidas.belongsTo(models.Detalle_Inscripcion, { foreignKey: 'materiaInscritaId' });// Relación con Detalle_Inscripcion
    }
  }
  MateriasVencidas.init({
    estudianteId: DataTypes.INTEGER,
    materiaInscritaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MateriasVencidas',
  });
  return MateriasVencidas;
};