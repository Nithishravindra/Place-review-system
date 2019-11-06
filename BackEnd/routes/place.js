const bodyParser = require('body-parser');
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

// to INSERT an PLACE
// Router.post("/add", (req, res) => {
//     let place  = req.body;
   
//     let sqll = ' INSERT INTO users (name, email, password, phno) VALUES ' + '(' +   "'" + place.PLACE_TITLE + "'" + ',' + "'" + place.PLACE_DESCRIPTION + "'"  + ',' + "'" + place.PLACE_DESCRIPTION  +"'" + ',' +  place.USERS_USER_ID +')';
//     mysqlConnection.query(sqll,(error, rows, fields) => {
//         res.render('USER_ID');
//         if(!error){
//              rows.forEach(element => {
//              if(element.constructor == Array)
//                     res.send('INSERTED  PLACE_ID = ' + element[0].PLACE_ID);
//             });
//         } else {
//             console.log(error);
//         }
//     })
// })


Router.post("/add", (req, res) => {
    let usr  = req.body;
    console.log(usr);
    console.log('seesonnnnn ',req.session.userId);
    let sqll = ' INSERT INTO places (place_title, place_description, users_user_id) VALUES ' + '(' +   "'" + usr.PLACE_TITLE + "'" + ',' + "'" + usr.PLACE_DESCRPTION + "'"  + ',' + "'" + usr.USERS_USER_ID  +"'" +  ')';
    console.log(sqll);
    mysqlConnection.query(sqll,(error, rows, fields) => {
        if(!error) {
            console.log('seesonnnnn ',req.session.userId);
            //send(email);
            console.log('new place added');
            res.send('inserted');
            //res.redirect('/welcomePage')
        } else {
            console.log(error)
            res.send('Invalid email or inputs');
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