const CreateFacultadCommand = require('./facultad/createFacultadCommand');
const UpdateFacultadCommand = require('./facultad/updateFacultadCommand');
const DeleteFacultadCommand = require('./facultad/deleteFacultadCommand');
const GetFacultadCommand = require('./facultad/getFacultadCommand');

const CreateEstudianteCommand = require('./estudiante/createEstudianteCommand');
const UpdateEstudianteCommand = require('./estudiante/updateEstudianteCommand');
const DeleteEstudianteCommand = require('./estudiante/deleteEstudianteCommand');
const GetEstudianteCommand = require('./estudiante/getEstudianteCommand');

const CreateMateriaCommand = require('./materia/createMateriaCommand');
const UpdateMateriaCommand = require('./materia/updateMateriaCommand');
const DeleteMateriaCommand = require('./materia/deleteMateriaCommand');
const GetMateriaCommand = require('./materia/getMateriaCommand');

const CreateDocenteCommand = require('./docente/createDocenteCommand');
const UpdateDocenteCommand = require('./docente/updateDocenteCommand');
const DeleteDocenteCommand = require('./docente/deleteDocenteCommand');
const GetDocenteCommand = require('./docente/getDocenteCommand');

const CreateCarreraCommand = require('./carrera/createCarreraCommand');
const UpdateCarreraCommand = require('./carrera/updateCarreraCommand');
const DeleteCarreraCommand = require('./carrera/deleteCarreraCommand');
const GetCarreraCommand = require('./carrera/getCarreraCommand');

const CreatePeriodoCommand = require('./periodo/createPeriodoCommand');
const UpdatePeriodoCommand = require('./periodo/updatePeriodoCommand');
const DeletePeriodoCommand = require('./periodo/deletePeriodoCommand');
const GetPeriodoCommand = require('./periodo/getPeriodoCommand');

const CreateGrupoMateriaCommand = require('./grupoMateria/createGrupoMateriaCommand');
const UpdateGrupoMateriaCommand = require('./grupoMateria/updateGrupoMateriaCommand');
const DeleteGrupoMateriaCommand = require('./grupoMateria/deleteGrupoMateriaCommand');
const GetGrupoMateriaCommand = require('./grupoMateria/getGrupoMateriaCommand');

const CreateAulaCommand = require('./aula/createAulaCommand');
const UpdateAulaCommand = require('./aula/updateAulaCommand');
const DeleteAulaCommand = require('./aula/deleteAulaCommand');
const GetAulaCommand = require('./aula/getAulaCommand');

const CreateModuloCommand = require('./modulo/createModuloCommand');
const UpdateModuloCommand = require('./modulo/updateModuloCommand');
const DeleteModuloCommand = require('./modulo/deleteModuloCommand');
const GetModuloCommand = require('./modulo/getModuloCommand');

const CreateHorarioCommand = require('./horario/createHorarioCommand');
const UpdateHorarioCommand = require('./horario/updateHorarioCommand');
const DeleteHorarioCommand = require('./horario/deleteHorarioCommand');
const GetHorarioCommand = require('./horario/getHorarioCommand');

const CreateActaDeNotasCommand = require('./actaDeNotas/createActaDeNotasCommand');
const UpdateActaDeNotasCommand = require('./actaDeNotas/updateActaDeNotasCommand');
const DeleteActaDeNotasCommand = require('./actaDeNotas/deleteActaDeNotasCommand');
const GetActaDeNotasCommand = require('./actaDeNotas/getActaDeNotasCommand');



class CommandInvoker {
    static commands = {
        'create_facultad': CreateFacultadCommand,
        'update_facultad': UpdateFacultadCommand,
        'delete_facultad': DeleteFacultadCommand,
        'get_facultad': GetFacultadCommand,

        'create_estudiante': CreateEstudianteCommand,
        'update_estudiante': UpdateEstudianteCommand,
        'delete_estudiante': DeleteEstudianteCommand,
        'get_estudiante': GetEstudianteCommand,

        'create_materia': CreateMateriaCommand,
        'update_materia': UpdateMateriaCommand,
        'delete_materia': DeleteMateriaCommand,
        'get_materia': GetMateriaCommand,

        'create_docente': CreateDocenteCommand,
        'update_docente': UpdateDocenteCommand,
        'delete_docente': DeleteDocenteCommand,
        'get_docente': GetDocenteCommand,

        'create_carrera': CreateCarreraCommand,
        'update_carrera': UpdateCarreraCommand,
        'delete_carrera': DeleteCarreraCommand,
        'get_carrera': GetCarreraCommand,

        'create_periodo': CreatePeriodoCommand,
        'update_periodo': UpdatePeriodoCommand,
        'delete_periodo': DeletePeriodoCommand,
        'get_periodo': GetPeriodoCommand,

        'create_grupoMateria': CreateGrupoMateriaCommand,
        'update_grupoMateria': UpdateGrupoMateriaCommand,
        'delete_grupoMateria': DeleteGrupoMateriaCommand,
        'get_grupoMateria': GetGrupoMateriaCommand,
        
        'create_aula': CreateAulaCommand,
        'update_aula': UpdateAulaCommand,
        'delete_aula': DeleteAulaCommand,
        'get_aula': GetAulaCommand,
        'create_modulo': CreateModuloCommand,
        'update_modulo': UpdateModuloCommand,
        'delete_modulo': DeleteModuloCommand,
        'get_modulo': GetModuloCommand,
        'create_horario': CreateHorarioCommand,
        'update_horario': UpdateHorarioCommand,
        'delete_horario': DeleteHorarioCommand,
        'get_horario': GetHorarioCommand,
        'create_actaDeNotas': CreateActaDeNotasCommand,
        'update_actaDeNotas': UpdateActaDeNotasCommand,
        'delete_actaDeNotas': DeleteActaDeNotasCommand,
        'get_actaDeNotas': GetActaDeNotasCommand
        // 'delete_facultad': DeleteFacultadCommand,
        // 'get_facultad': GetFacultadCommand
    };

    static createCommand(commandType, data) {
        console.log("Creando comando:", commandType);
        console.log("Datos del comando:", data);
        const CommandClass = this.commands[commandType];
        if (!CommandClass) {
            throw new Error(`Tipo de comando no soportado: ${commandType}`);
        }
        return new CommandClass(data);
    }
}

module.exports = CommandInvoker;