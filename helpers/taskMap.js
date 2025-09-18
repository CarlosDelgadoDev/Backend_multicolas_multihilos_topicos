// helpers/taskMap.js

// Aquí defines todas tus tareas y la tabla + campo único correspondiente
const taskMap = {
  create_estudiante: { tabla: "estudiantes", idField: "ci" },
  create_docente: { tabla: "docentes", idField: "ci" },
  create_facultad: { tabla: "facultades", idField: "sigla" },
  create_carrera: { tabla: "carreras", idField: "sigla", parentField: "facultadId" },
  create_plan_de_estudio: { tabla: "plan_de_estudios", idField: "codigo", parentField: "carreraId" },
  create_materia: { tabla: "materias", idField: "sigla" },

  // Agrega tus demás 13 tablas aquí siguiendo el mismo patrón
};

module.exports = taskMap;
