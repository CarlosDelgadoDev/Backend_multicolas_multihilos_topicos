'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Primero, obtenemos los IDs de las facultades por su sigla
    const facultades = await queryInterface.sequelize.query(
      `SELECT id, sigla FROM "Facultads";`
    );

    // Mapeamos las siglas a sus IDs
    const facultadMap = {};
    facultades[0].forEach(fac => {
      console.log(fac);
      facultadMap[fac.sigla] = fac.id;
    });

    console.log(facultades);
    console.log(facultadMap);

    // Datos de carreras
    const carreras = [
      {
        nombre: 'Ingeniería informática',
        descripcion: 'Forma ingenieros en desarrollo de software, inteligencia artificial.',
        sigla: 'INF',
        facultadId: facultadMap['FICCT'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Ingeniería en Telecomunicaciones',
        descripcion: 'Enfocada en redes, comunicaciones inalámbricas y sistemas digitales.',
        sigla: 'RDS',
        facultadId: facultadMap['FICCT'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Filosofía',
        descripcion: 'Estudio crítico del pensamiento, ética, lógica y metafísica.',
        sigla: 'FIL',
        facultadId: facultadMap['FCH'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Derecho',
        descripcion: 'Formación en leyes, derecho constitucional, penal y civil.',
        sigla: 'DER',
        facultadId: facultadMap['FCH'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Ofimatica',
        descripcion: 'Formacion en programacion.',
        sigla: 'OFI',
        facultadId: facultadMap['FPOLI'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    // Insertamos las carreras
    await queryInterface.bulkInsert('Carreras', carreras, {});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
