const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');
const {isAuthorized} = require('../utils'); 
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
Router.use(cookieParser());

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


Router.post("/add", isAuthorized, (req, res) => {


    let usr  = req.body;
    let token = req.cookies.token
    console.log( 'reqookie' ,token)
    
    // try {
    //     jwt.verify(token,  process.env.JWT_SECRET, (err, authData) => {
    //         console.log('token = ', req.token)
    //         if(err) {
    //             console.log(err)
    //             res.send("Error")
    //         } else {
                
    //             authData
    //             console.log('authoo data = ',authData.userID)
    //             res.send({userID: authData.userID })
    //         }
    //     })
    // } catch (error) {
    //     throw error
    // }
    
    USERS_USER_ID = 1;
    mysqlConnection.query('INSERT INTO places (place_title, place_description, users_user_id) VALUES (?, ?, ?)',
    [placeTitle, description, USERS_USER_ID],(error, rows, fields) => {
        if(!error) {
            console.log('new place added');
            res.send('inserted');
            //res.redirect('/welcomePage')
        } else {
            console.log(error)
            res.send('Enter valid details');
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