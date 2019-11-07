const bodyParser = require('body-parser');
const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

// to get all ratings
Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM rating', (error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to get individual rating by ratind_id
Router.get("/:id", (req, res) => {
    mysqlConnection.query('SELECT * FROM rating WHERE rating_id = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to DELETE an rating
Router.delete("/delete/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM rating WHERE rating_id = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send('Deleted successfully');
        } else {
            console.log(error);
        }
    })
})

// to INSERT an rating
Router.post("/add", (req, res) => {
    let usr  = req.body;
    var sqll = ' SET @RATING_ID = ?; SET @TOTAL_RATING = ?; SET @ACCEPT_RATING = ?; SET @COMMENT = ?; SET @PLACES_PLACE_ID = ? ; SET @USERS_USER_ID = ?; \
    CALL AddRating(@RATING_ID, @TOTAL_RATING, @ACCEPT_RATING, @COMMENT, @PLACES_PLACE_ID, @USERS_USER_ID);';
    mysqlConnection.query(sqll, [usr.RATING_ID, usr.TOTAL_RATING, usr.ACCEPT_RATING, usr.COMMENT, usr.PLACES_PLACE_ID, usr.USERS_USER_ID],(error, rows, fields) => {
          if(!error){
             rows.forEach(element => {
             if(element.constructor == Array)
                    res.send('INSERTED RATING_ID = ' + element[0].RATING_ID);
            });
        } else {
            console.log(error);
        }
    })
})

// to UPDATE existing rating 
Router.put("/update", (req, res) => {
    let usr  = req.body;
    var sqll = ' SET @RATING_ID = ?; SET @TOTAL_RATING = ?; SET @ACCEPT_RATING = ?; SET @COMMENT = ?; SET @PLACES_PLACE_ID = ? ; SET @USERS_USER_ID = ?; \
    CALL AddRating(@RATING_ID, @TOTAL_RATING, @ACCEPT_RATING, @COMMENT, @PLACES_PLACE_ID, @USERS_USER_ID);';
    console.log(usr, sqll);
    mysqlConnection.query(sqll, [usr.RATING_ID, usr.TOTAL_RATING, usr.ACCEPT_RATING, usr.COMMENT, usr.PLACES_PLACE_ID, usr.USERS_USER_ID],(error, rows, fields) => {
        if(!error){
            res.send('updated successfully');
        } else {
            console.log(error);
        }
    })
})

module.exports = Router;