const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const cookieParser = require('cookie-parser')
Router.use(cookieParser());


// to get all USERS
Router.get("/", (req, res) => {
    mysqlConnection.query(
        'SELECT * FROM users', (error, rows, fields) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
            }
        })
})

// to get individual USER by USER_ID
Router.get("/:id", (req, res) => {
    mysqlConnection.query(
        'SELECT * FROM users WHERE user_id = ? ', [req.params.id], (error, rows, fields) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
            }
        })
})

// to DELETE an USER 
Router.delete("/delete/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM users WHERE user_id = ? ', [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.send('Deleted successfully');
        } else {
            console.log(error);
        }
    })
})

// to INSERT an user 
Router.post("/add", (req, res) => {

    let usr = req.body;
    let sql = 'INSERT INTO users(name, email, password, phno) VALUES (?,?,?,?)'
    mysqlConnection.query(
        sql, [usr.name, usr.email, usr.password, usr.phno], (error, rows, fields, next) => {
            if (!error) {
                const msg = {
                    to: "nithishravindra8@gmail.com",
                    from: "nithishravindra8@gmau",
                    subject: 'PLACE REVIEW SYSTEM',
                    text: 'Thanks for registering to place-reviewe-system',
                }
                // sgMail.send(msg, (error, result) => {
                // if (error) {
                //    console.log(error)
                // }
                // else {
                //      console.log('email sent', result)
                //     }
                // });

                //console.log('email sent');
                res.status(200).send('inserted');
            } else {
                console.log(error)
                res.status(401).send('Invalid email or inputs');
            }
        })
})

// to UPDATE an existing user 
Router.put("/update", (req, res) => {
    let usr = req.body;
    let sqll = ' SET @USER_ID = ?; SET @NAME = ?; SET @EMAIL = ?; SET @PASSWORD = ?; SET @PHNO = ? ;\
    CALL UserAddOrEdit(@USER_ID, @NAME, @EMAIL, @PASSWORD, @PHNO);';
    mysqlConnection.query(
        sqll, [usr.USER_ID, usr.NAME, usr.EMAIL, usr.PASSWORD, usr.PHNO], (error, results, fields) => {
            if (!error) {
                res.status(200).send('Updated successfully');
            } else {
                res.status(401).send('Unsuccessful')
            }
        })
})



Router.post('/login', function (req, res) {
    let { email, password } = req.body;
    if (email && password) {
        mysqlConnection.query(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password],
            function (error, results, fields) {
                if (results.length > 0) {
                    const newUserJson = (JSON.stringify(results[0].USER_ID));
                    const userID = newUserJson
                    console.log(userID);
                    res.status(200).send({ 'statusCode': 200, 'Message': userID })
                } else {
                    res.status(401).send({ 'statusCode': 401, message: 'Invalid credentials!' });
                }
            }
        )
    } else {
        res.status(401).send({ statusCode: 401, message: 'Please enter Username and Password!' });
    }
})

Router.post('/logout', function (req, res) {

    let logoutUser = req.body;
    if (logoutUser) res.status(200).send({ statusCode: 200, message: 'logout successfull' })
    else res.status(400).send({ statusCode: 401, message: 'Auth failed' })
})

module.exports = Router; 