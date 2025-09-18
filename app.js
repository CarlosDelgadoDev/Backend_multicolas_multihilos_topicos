var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');  // <-- agregado cors

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var estudiantesRouter = require('./routes/estudiantes');
var carrerasRouter = require('./routes/carreras');
var facultadesRouter = require('./routes/facultades');
var periodosRouter = require('./routes/periodos');
var gestionesRouter = require('./routes/gestiones');
var detalleCarreraCursadasRouter = require('./routes/detalle_carrera_cursadas');
var actaDeNotasRouter = require('./routes/acta_de_notas');
var preRequisitoRouter = require('./routes/pre_requisito');
var detalleInscripcionRouter = require('./routes/detalle_inscripcion');
var detalleNotasRouter = require('./routes/detalle_notas');
var horariosRouter = require('./routes/horarios');
var boletaInscripcionRouter = require('./routes/boleta_inscripcion');
var planDeEstudioRouter = require('./routes/plan_de_estudio');
var grupoMateriaRouter = require('./routes/grupo_materia');
var aulasRouter = require('./routes/aulas');
var modulosRouter = require('./routes/modulos');
var materiasRouter = require('./routes/materias');
var docentesRouter = require('./routes/docentes');
var tasksRoute = require('./routes/task')

var workerRouter = require('./routes/worker');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // <-- habilita CORS aquí
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/estudiantes', estudiantesRouter);
app.use('/carreras', carrerasRouter);
app.use('/facultades', facultadesRouter);
app.use('/periodos', periodosRouter);
app.use('/gestiones', gestionesRouter);
app.use('/detalle_carrera_cursadas', detalleCarreraCursadasRouter);
app.use('/acta_de_notas', actaDeNotasRouter);
app.use('/pre_requisitos', preRequisitoRouter);
app.use('/detalle_inscripcion', detalleInscripcionRouter);
app.use('/detalle_notas', detalleNotasRouter);
app.use('/horarios', horariosRouter);
app.use('/boleta_inscripcion', boletaInscripcionRouter);
app.use('/plan_de_estudio', planDeEstudioRouter);
app.use('/grupo_materia', grupoMateriaRouter);
app.use('/aulas', aulasRouter);
app.use('/modulos', modulosRouter);
app.use('/materias', materiasRouter);
app.use('/docentes', docentesRouter);

app.use("/tasks", tasksRoute);

app.use("/worker", workerRouter);

module.exports = app;
