const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

// to get all comments
Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM comment', (error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

Router.post("/add", (req, res) => {
    //get userId and placeId
    const userId = 1;
    const placeId = 1;
    
    let usr = req.body;
    console.log('responese => ', usr);
    mysqlConnection.query('insert into comment (COMMENT,USERS_USER_ID,PLACES_PLACE_ID) values(?,?,?)',[usr.COMMENT,userId,placeId], (error, rows, fields) => {
        if(!error){
            console.log(rows)
            res.send('added comment successfully');
        } else {
            console.log(error);
            res.send('Error')
        }
    })
})

module.exports = Router;