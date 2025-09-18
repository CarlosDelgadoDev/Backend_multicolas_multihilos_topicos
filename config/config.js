require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",//'carlos',
    password: process.env.DB_PASSWORD || "60910990", //'12345678',
    database: process.env.DB_NAME || "topicos_db", //'topicos',
    host: process.env.DB_HOST || "localhost",//'db',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  }
};
