const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

// to get all PLACES
Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM places', (error, rows, fields) => {
        if (!error) {
            console.log('select p.place_id,p.place_title, p.place_description, r.average_rating, c.comment, c.name  from places p, rating r, comment cwhere p.place_id = 43')
            res.status(200).send(rows);
        } else {
            console.log(error);
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
    console.log(usr.placeTitle, usr.description, usr.userID, usr.userID)
    mysqlConnection.query('INSERT INTO places (place_title, place_description, user_id) VALUES (?, ?, ?)',
        [usr.placeTitle, usr.description, usr.userID], (error, rows, fields) => {
            if (!error) {
                let addPlaceID = rows.insertId;
                console.log('placeID = ', addPlaceID)
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
            res.status(200).send(' yay! Updated successfully');
        } else {
            console.error(error)
            res.status(401).send('failed')
        }
    })
});


Router.get("/listofplaces", (req, res) => {
    let query = 'SELECT place_id, place_title, place_description FROM places';
    mysqlConnection.query(query, (error, rows, fields) => {
        if (error) {
            res.status(400).send("Error")
        } else {
            console.log('placeItem', rows);
            res.status(200).send(rows);
        }
    })
});

Router.get("/:placename", (req, res) => {
    let placeName = req.params.placename;
    //console.log('placeName == ', placeName);
    let forPlaceID = 'select place_id from places where place_title = ?';
    let commentItem = 'select  c.comment_id, c.name, c.comment from comment c where place_id = ?';
    let average = 'select average_rating from rating where place_id = ?'
    mysqlConnection.query(forPlaceID, placeName, (error, rows, fields) => {
        if (error) {
            console.error(error);
            res.status(400).send("Error");
        } else {
            if (rows.length > 0) {
                let placeID = rows[0].place_id;
                console.log('placeID => ', rows[0].place_id);
                mysqlConnection.query(commentItem, placeID, (error, rows) => {
                    if (!error) {
                        if (rows.length > 0) {
                            let commentList = JSON.parse(JSON.stringify(rows));
                            mysqlConnection.query(average, placeID, (error, rows) => {
                                if (!error) {
                                    let averageItem = JSON.parse(JSON.stringify(rows[0]));
                                    console.log('averageee', averageItem)
                                     const newObj = commentList.flat().map(p => Object.assign(p, averageItem));
                                    // let newObj = Object.assign({}, averageItem, commentList);
                                    console.log('final obj = ', newObj);
                                    res.status(200).send(newObj);
                                } else {
                                    res.status(401).send("failed here")
                                }
                            })
                        } else {
                            res.status(200).send({ "average_rating": 0 })
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