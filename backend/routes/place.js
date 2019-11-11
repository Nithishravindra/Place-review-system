const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

// to get all PLACES
Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM PLACES', (error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to get individual PLACE by PLACE_ID
Router.get("/:id", (req, res) => {
    mysqlConnection.query('SELECT * FROM places WHERE PLACE_ID = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to DELETE an PLACE 
Router.delete("/delete/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM places WHERE PLACE_ID = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send('Deleted successfully');
        } else {
            console.log(error);
        }
    })
})


// to insert a place 
Router.post("/add",  (req, res) => {
    let usr  = req.body;
    console.log(usr.placeTitle, usr.description, usr.userID)
    mysqlConnection.query('INSERT INTO places (place_title, place_description, users_user_id) VALUES (?, ?, ?)',
    [usr.placeTitle, usr.description, usr.userID],(error, rows, fields) => {
        if(!error) {
            console.log('new place added');
            res.status(200).send({'statusCode': 200, 'Message': usr.userID})    
        } else {
            res.status(401).send({statusCode:401, message: 'Place already exists'});
        }
    })
})


// to UPDATE an existing PLACE  
Router.put("/update", (req, res) => {
    let usr  = req.body;
    var sqll = ' SET @PLACE_ID = ?; SET @PLACE_TITLE = ?; SET @PLACE_DESCRIPTION = ?; SET @USERS_USER_ID = ?;\
    CALL AddPlace(@PLACE_ID, @PLACE_TITLE, @PLACE_DESCRIPTION, @USERS_USER_ID);';
    mysqlConnection.query(sqll, [usr.PLACE_ID, usr.PLACE_TITLE, usr.PLACE_DESCRIPTION, usr.USERS_USER_ID],(error, rows, fields) => {
        if(!error){
            res.send('updated successfully');
        } else {
            console.log(error);
        }
    })
})

module.exports = Router;