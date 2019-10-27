const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'placereviewsystem',
    multipleStatements: true
});

connection.connect(function(error) {
    if(error) 
        throw error;
    console.log('Connected');
    
});

module.exports = connection;