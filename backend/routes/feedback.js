const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');

Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM feedback', (error, rows, fields) => {
        if (!error) {
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to get individual feedback by feedback_ID
Router.get("/:id", (req, res) => {
    mysqlConnection.query('SELECT * FROM feedback WHERE feedback_id = ? ', [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to DELETE an FEEDBACK
Router.delete("/delete/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM feedback WHERE feedback_ID = ? ', [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.send('Deleted successfully');
        } else {
            console.log(error);
        }
    })
})

// to INSERT an FEEDBACK
Router.post("/add", (req, res) => {
    let usr = req.body;
    mysqlConnection.query('INSERT INTO feedback (feedback_comment, yesorno, users_user_id) VALUES (?, ?, ?)',
        [usr.feedback, usr.radio, usr.userID], (error, rows, fields) => {
            if (!error) {
                console.log('successfully added feedback');
                res.send('thanks for feedback');
            } else {
                console.log(error);
                res.send('Unsuccesful');
            }
        })
})

module.exports = Router;