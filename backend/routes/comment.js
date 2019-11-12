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
    const placeId = 1;
   // replace placeID  
    const userID = 2;
    let usr = req.body;
    console.log('responese => ', usr);

  
    var params = [usr.COMMENT, usr.userID, placeId, usr.TOTAL_RATING, usr.userID, placeId]
    console.log(params)
    
    mysqlConnection.query('insert into comment (COMMENT,USERS_USER_ID,PLACES_PLACE_ID) values(?,?,?) ;\
    insert into rating_star (TOTAL_RATING, USERS_USER_ID, PLACES_PLACE_ID) values (?, ?, ?)'  ,params,(error, rows, fields) => {
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