const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM rating_star', (error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

Router.post("/add", (req, res) => {

    const userId = 1;
    const placeId = 1;
    
    let usr = req.body;
    console.log(usr);
    mysqlConnection.query('insert into rating_star (TOTAL_RATING, USERS_USER_ID, PLACES_PLACE_ID) values (?, ?, ?) \
    ', [usr.TOTAL_RATING,userId,placeId],(error, rows, fields) => {
        if(!error){
            res.send('done with rating');
        } else {
            console.log(error);
        }
    })
})

module.exports = Router;