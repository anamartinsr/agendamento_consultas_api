// import dotenv from 'dotenv';
// dotenv.config();
// eslint-disable-next-line no-undef
require('dotenv').config();

// eslint-disable-next-line no-undef
module.exports = {
    // eslint-disable-next-line no-undef
    username: process.env.DATABASE_USERNAME,
    // eslint-disable-next-line no-undef
    password: process.env.DATABASE_PASSWORD,
    // eslint-disable-next-line no-undef
    database: process.env.DATABASE_NAME,
    // eslint-disable-next-line no-undef
    host: process.env.DATABASE_HOST,
    // eslint-disable-next-line no-undef
    port: process.env.DATABASE_PORT,
    // eslint-disable-next-line no-undef
    dialect: process.env.DATABASE_DIALECT,
    define: {
        underscored: true,
    },
};
