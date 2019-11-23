const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

// to get all ratings
Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM rating', (error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to get individual rating by ratind_id
Router.get("/:id", (req, res) => {
    mysqlConnection.query('SELECT * FROM rating WHERE rating_id = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to DELETE an rating
Router.delete("/delete/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM rating WHERE rating_id = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.status(200).send('Deleted successfully');
        } else {
            console.log(error);
        }
    })
})

module.exports = Router;