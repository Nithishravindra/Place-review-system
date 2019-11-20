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
    const placeId = 42;
   // replace placeID  
    let usr = req.body;
    console.log(usr.userID)
    mysqlConnection.query('SELECT name from users where user_id = ?',usr.userID, (error, rows, fields) => {
        let userName = rows[0].name;
        console.log(userName)
        let params = [usr.COMMENT, userName, usr.userID, placeId, usr.userRating, usr.userID, placeId, placeId,placeId]
            if(!error){
                mysqlConnection.query('insert into comment (COMMENT, NAME, USERS_USER_ID, PLACES_PLACE_ID) values(?,?,?,?) ;\
                insert into rating_star (TOTAL_RATING, USERS_USER_ID, PLACES_PLACE_ID) values (?, ?, ?); \
                UPDATE rating \
                SET average_rating = (select ROUND(AVG(TOTAL_RATING),0) FROM RATING_STAR WHERE PLACES_PLACE_ID = ?)\
                where places_place_id = ?;'  ,params,(error, rows, fields) => {
                    if(!error){
                        console.log(rows)
                        res.status(200).send('added comment successfully');
                    } else {
                        console.error(error);
                    }
                })
            } else {
                res.status(400).send('Error')
            }
    })
   
})

module.exports = Router;