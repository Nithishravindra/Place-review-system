const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

// to get all PLACES
Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM places', (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        } else {
            console.error(error);
        }
    });
});

// to DELETE an PLACE 
Router.delete("/delete/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM places WHERE place_id = ? ', [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.status(200).send('Deleted successfully');
        } else {
            console.log(error);
            res.status(401).send("Place does not exit");
        }
    })
});


// to insert a place 
Router.post("/add", (req, res) => {
    let usr = req.body;
    mysqlConnection.query('INSERT INTO places (place_title, place_description, user_id) VALUES (?, ?, ?)',
        [usr.placeTitle, usr.description, usr.userID], (error, rows, fields) => {
            if (!error) {
                console.log("place added");
                let addPlaceID = rows.insertId;
                res.status(200).send({ 'statusCode': 200, 'message': usr.userID })
            } else {
                res.status(401).send({ 'statusCode': 401, 'message': 'Place already exists' });
            }
        })
});

// to UPDATE an existing PLACE  
Router.put("/update", (req, res) => {
    let usr = req.body;
    let sqll = ' SET @PLACE_ID = ?; SET @PLACE_TITLE = ?; SET @PLACE_DESCRIPTION = ?;\
    CALL PlaceEdit(@PLACE_ID, @PLACE_TITLE, @PLACE_DESCRIPTION);';
    mysqlConnection.query(sqll, [usr.PLACE_ID, usr.PLACE_TITLE, usr.PLACE_DESCRIPTION, usr.USERS_USER_ID], (error, rows, fields) => {
        if (!error) {
            console.log("Updated")
            res.status(200).send(' yay! Updated successfully');
        } else {
            console.error(error)
            res.status(401).send('failed')
        }
    })
});

//listOfPlaces 
Router.get("/listofplaces", (req, res) => {
    let query = 'SELECT place_id, place_title, place_description FROM places';
    mysqlConnection.query(query, (error, rows, fields) => {
        if (error) {
            console.error(error)
            res.status(400).send("Error")
        } else {
            res.status(200).send(rows);
        }
    })
});


Router.get("/:placename", (req, res) => {
    let placeName = req.params.placename;
    let forPlaceID = 'select place_title, place_id, place_description from places where place_title = ?';
    let commentItem = 'select  c.comment_id, c.name, c.comment from comment c where place_id = ?';
    let average = 'select average_rating from rating where place_id = ?'
    mysqlConnection.query(forPlaceID, placeName, (error, rows, fields) => {
        if (error) {
            console.error(error);
            res.status(400).send("Error");
        } else {
            if (rows.length > 0) {
                let placeID = rows[0].place_id;
                let placeItem = JSON.parse(JSON.stringify(rows));
                mysqlConnection.query(commentItem, placeID, (error, rows) => {
                    if (!error) {
                        if (rows.length > 0) {
                            const commentList = JSON.parse(JSON.stringify(rows));
                            mysqlConnection.query(average, placeID, (error, rows) => {
                                if (!error) {
                                    let averageItem = JSON.parse(JSON.stringify(rows[0]));
                                    let newObj = Object.assign({}, { averageItem, commentList, placeItem });
                                    res.status(200).send(newObj);
                                } else {
                                    res.status(401).send("failed here")
                                }
                            })
                        } else {
                            let averageItem = { " average_rating": 0 }, commentList = [];
                            let newObj = Object.assign({}, { averageItem, commentList, placeItem });
                            res.status(200).send(newObj)
                        }
                    } else {
                        console.error(error);
                        res.status(401).send("failed")
                    }
                })
            } else {
                res.status(201).send("Invalid PlaceName");
            }
        }
    });
});

module.exports = Router;