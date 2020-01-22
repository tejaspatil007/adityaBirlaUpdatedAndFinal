const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'strudb'
})
connection.connect(function (error) {
    if (error) {
        console.log(error)
    }
    else {
        console.log('Mysql connected...');
    }
})

module.exports = connection;

