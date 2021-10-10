require('dotenv').config();
const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password
});

pool.getConnection((err, connection) => {
    if (err)
        throw err;
    console.log('Database connected successfully');
    connection.release();
});
module.exports = pool;