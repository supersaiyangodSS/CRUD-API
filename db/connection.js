const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api'
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log(`connected to MySQL`);
    }
});

module.exports = connection;