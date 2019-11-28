const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

// to get all comments
Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM comment', (error, rows, fields) => {
        if (!error) {
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to insert new place
Router.post("/add", (req, res) => {
    let usr = req.body;
    mysqlConnection.query('SELECT name from users where user_id = ?', usr.userID, (error, rows, fields) => {
        let userName = rows[0].name;
        let params = [usr.COMMENT, userName, usr.userID, usr.placeId, usr.userRating, usr.userID, usr.placeId, usr.placeId, usr.placeId]
        if (!error) {
            mysqlConnection.query('INSERT INTO comment (comment, name, USERS_USER_ID, place_id) VALUES (?,?,?,?) ;\
                INSERT INTO rating_star (TOTAL_RATING, USERS_USER_ID, place_id) values (?, ?, ?); \
                UPDATE rating \
                SET average_rating = (SELECT ROUND(AVG(total_rating),0) FROM rating_star WHERE place_id = ?)\
                WHERE place_id = ?;'  , params, (error, rows, fields) => {
                if (!error) {
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