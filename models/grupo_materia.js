'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrupoMateria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GrupoMateria.belongsTo(models.Materia, { foreignKey: 'materiaId' });
      GrupoMateria.belongsTo(models.Docente, { foreignKey: 'docenteId' });
      GrupoMateria.belongsTo(models.Periodo, { foreignKey: 'periodoId' });
      GrupoMateria.hasMany(models.Detalle_Inscripcion, { foreignKey: 'grupoMateriaId' });
      GrupoMateria.hasMany(models.AulaHorario, { foreignKey: 'grupoMateriaId' });
    }
  }
  GrupoMateria.init({
    sigla: DataTypes.STRING,
    materiaId: DataTypes.INTEGER,
    docenteId: DataTypes.INTEGER,
    periodoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Grupo_Materia',
    tableName: 'Grupo_Materias',
  });
  return GrupoMateria;
};