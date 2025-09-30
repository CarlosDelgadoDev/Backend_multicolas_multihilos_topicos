'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle_Inscripcion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  Detalle_Inscripcion.belongsTo(models.Boleta_Inscripcion, { foreignKey: 'boletaInscripcionId' });
  Detalle_Inscripcion.belongsTo(models.Grupo_Materia, { foreignKey: 'grupoMateriaId' });
  Detalle_Inscripcion.hasMany(models.Detalle_de_notas, { foreignKey: 'detalleInscripcionId' , onDelete: 'SET NULL' });
  Detalle_Inscripcion.hasMany(models.MateriasVencidas, { foreignKey: 'materiaInscritaId' , onDelete: 'SET NULL' }); // Relación con MateriasVencidas
    }
  }
  Detalle_Inscripcion.init({
    boletaInscripcionId: DataTypes.INTEGER,
    grupoMateriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detalle_Inscripcion',
  });
  return Detalle_Inscripcion;
};