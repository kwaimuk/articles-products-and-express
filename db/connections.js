const pgp = require('pg-promise')();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'apdb',
    user: 'jim',
    password: 'letmein'
};

const db = pgp(cn);


module.exports =db;