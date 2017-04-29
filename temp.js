const pgp = require('pg-promise')();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'apdb',
    user: 'jim',
    password: 'letmein'
};

const db = pgp(cn);

// db.any('SELECT * FROM products')
//     .then(function(data) {
//         // success;
//         console.log(data);
//     })
//     .catch(function(error) {
//         // error;
//         console.log(error);
//     });
module.export =db;