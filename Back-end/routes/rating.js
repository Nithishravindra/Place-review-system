const bodyParser = require('body-parser');
const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

// to get all USERS
Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM rating', (error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to get individual USER by USER_ID
Router.get("/:id", (req, res) => {
    mysqlConnection.query('SELECT * FROM rating WHERE rating_id = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to DELETE an USER 
Router.delete("/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM rating WHERE rating_id = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send('Deleted successfully');
        } else {
            console.log(error);
        }
    })

})

// to INSERT an user 
Router.post("/", (req, res) => {
    let usr  = req.body;
    var sqll = ' SET @RATING_ID = ?; SET @AVERAGE_RATING = ?; SET @TOTAL_RATING = ?; SET @COMMENT = ?; SET @PLACES_PLACE_ID = ? ; SET @USERS_USER_ID = ?; \
    CALL AddRating(@RATING_ID, @AVERAGE_RATING, @TOTAL_RATING, @COMMENT, @PLACES_PLACE_ID, @USERS_USER_ID);';
    mysqlConnection.query(sqll, [usr.RATING_ID, usr.AVERAGE_RATING, usr.TOTAL_RATING, usr.COMMENT, usr.PLACES_PLACE_ID, usr.USERS_USER_ID],(error, rows, fields) => {
          if(!error){
             console.log('innnnn ');
             rows.forEach(element => {
             if(element.constructor == Array)
                    res.send('INSERTED USER_ID = ' + element[0].RATING_ID);
            });
        } else {
            console.log(error);
        }
    })
})

// to UPDATE an existing user 
Router.put("/", (req, res) => {
    let usr  = req.body;
    var sqll = ' SET @RATING_ID = ?; SET @AVERAGE_RATING = ?; SET @TOTAL_RATING = ?; SET @COMMENT = ?; SET @PLACES_PLACE_ID = ? ; SET @USERS_USER_ID = ?; \
    CALL AddRating(@RATING_ID, @AVERAGE_RATING, @TOTAL_RATING, @COMMENT, @PLACES_PLACE_ID, @USERS_USER_ID);';
    console.log(usr, sqll);
    mysqlConnection.query(sqll, [usr.RATING_ID, usr.AVERAGE_RATING, usr.TOTAL_RATING, usr.COMMENT, usr.PLACES_PLACE_ID, usr.USERS_USER_ID],(error, rows, fields) => {
        if(!error){
            console.log(usr.USER_ID, usr.EMAIL);
            console.log('Stored procedure invoked');
            res.send('updated successfully');
        } else {
            console.log(error);
        }
    })
})

module.exports = Router;