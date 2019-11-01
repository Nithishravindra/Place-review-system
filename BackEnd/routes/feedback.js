const bodyParser = require('body-parser');
const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');


Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM feedback', (error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to get individual feedback by feedback_ID
Router.get("/:id", (req, res) => {
    mysqlConnection.query('SELECT * FROM feedback WHERE feedback_id = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to DELETE an FEEDBACK
Router.delete("/delete/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM feedback WHERE feedback_ID = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send('Deleted successfully');
        } else {
            console.log(error);
        }
    })
})

// to INSERT an FEEDBACK
Router.post("/add", (req, res) => {
    let usr  = req.body;
    var sqll = ' SET @FEEDBACK_ID = ?; SET @FEEDBACK_COMMENT = ?; SET @USERS_USER_ID= ?;\
    CALL AddFeedback(@FEEDBACK_ID, @FEEDBACK_COMMENT, @USERS_USER_ID);';
    mysqlConnection.query(sqll, [usr.FEEDBACK_ID, usr.FEEDBACK_COMMENT, usr.USERS_USER_ID],(error, rows, fields) => {
        if(!error){
             rows.forEach(element => {
             if(element.constructor == Array)
                    res.send('INSERTED  PLACE_ID = ' + element[0].FEEDBACK_ID);
            });
        } else {
            console.log(error);
        }
    })
})

// to UPDATE an existing FEEDBACK
Router.put("/update", (req, res) => {
    let usr  = req.body;
    var sqll = ' SET @FEEDBACK_ID = ?; SET @FEEDBACK_COMMENT = ?; SET @USERS_USER_ID= ?;\
    CALL AddFeedback(@FEEDBACK_ID, @FEEDBACK_COMMENT, @USERS_USER_ID);';
    mysqlConnection.query(sqll, [usr.FEEDBACK_ID, usr.FEEDBACK_COMMENT, usr.USERS_USER_ID],(error, rows, fields) => {
        if(!error){
            res.send('updated successfully');
        } else {
            console.log(error);
        }
    })
})

module.exports = Router;