const swaggerJSDoc = require('swagger-jsdoc');
//const fs = require('fs');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Topicos Inscripcion',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema de inscripción',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Documentar desde los archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

// Guardar la especificación en un archivo JSON
//fs.writeFileSync('./swagger-output.json', JSON.stringify(swaggerSpec, null, 2));

module.exports = swaggerSpec;
