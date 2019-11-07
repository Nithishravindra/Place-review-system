const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'PlaceReviewSystem',
    multipleStatements: true
});

connection.connect(function(error) {
    if(error) 
    {
        console.log( 'error connectiong to db ' + JSON.stringify(error, undefined, 2));
    } else  {
        console.log('Connected');
    }
});

module.exports = connection;