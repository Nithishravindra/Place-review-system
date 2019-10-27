const bodyParser = require('body-parser');
const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

// to get all USERS
Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to get individual USER by USER_ID
Router.get("/:id", (req, res) => {
    mysqlConnection.query('SELECT * FROM users WHERE user_id = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to DELETE an USER 
Router.delete("/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM users WHERE user_id = ? ',[req.params.id] ,(error, rows, fields) => {
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
    var sqll = ' SET @USER_ID = ?; SET @NAME = ?; SET @EMAIL = ?; SET @PASSWORD = ?; SET @PHNO = ? ;\
    CALL UserAddOrEdit(@USER_ID, @NAME, @EMAIL, @PASSWORD, @PHNO);';
    mysqlConnection.query(sqll, [usr.USER_ID, usr.NAME, usr.EMAIL, usr.PASSWORD, usr.PHNO],(error, rows, fields) => {
        if(!error){
             rows.forEach(element => {
             if(element.constructor == Array)
                    res.send('INSERTED USER_ID = ' + element[0].USER_ID);
            });
        } else {
            console.log(error);
        }
    })
})

// to UPDATE an existing user 
Router.put("/", (req, res) => {
    let usr  = req.body;
    var sqll = ' SET @USER_ID = ?; SET @NAME = ?; SET @EMAIL = ?; SET @PASSWORD = ?; SET @PHNO = ? ;\
    CALL UserAddOrEdit(@USER_ID, @NAME, @EMAIL, @PASSWORD, @PHNO);';
    console.log(usr, sqll);
    mysqlConnection.query(sqll, [usr.USER_ID, usr.NAME, usr.EMAIL, usr.PASSWORD, usr.PHNO],(error, rows, fields) => {
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