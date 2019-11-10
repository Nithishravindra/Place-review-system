const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const cookieParser = require('cookie-parser')

Router.use(cookieParser());


// to get all USERS
Router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to get individual USER by USER_ID
Router.get("/:id", (req, res) => {
    mysqlConnection.query('SELECT * FROM users WHERE user_id = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send(rows);
        } else {
            console.log(error);
        }
    })
})

// to DELETE an USER 
Router.delete("/delete/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM users WHERE user_id = ? ',[req.params.id] ,(error, rows, fields) => {
        if(!error){
            res.send('Deleted successfully');
        } else {
            console.log(error);
        }
    })
})

// to INSERT an user 
Router.post("/add", (req, res) => {
    
    let usr  = req.body;
    let sqll = ' INSERT INTO users (name, email, password, phno) VALUES ' + '(' +   "'" + usr.name + "'" + ',' + "'" + usr.email + "'"  + ',' + "'" + usr.password  +"'" + ',' +  usr.phno +')';
    console.log(sqll);
    mysqlConnection.query(sqll,(error, rows, fields, next) => {
        if(!error) {
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
        res.send('inserted');
        // res.redirect('/welcomePage')
        } else {
            console.log(error)
            res.send('Invalid email or inputs');
        }
    })
})

// to UPDATE an existing user 
Router.put("/update", (req, res) => {
    let usr  = req.body;
    var sqll = ' SET @USER_ID = ?; SET @NAME = ?; SET @EMAIL = ?; SET @PASSWORD = ?; SET @PHNO = ? ;\
    CALL UserAddOrEdit(@USER_ID, @NAME, @EMAIL, @PASSWORD, @PHNO);';
    console.log(usr, sqll);
    mysqlConnection.query(sqll, [usr.USER_ID, usr.NAME, usr.EMAIL, usr.PASSWORD, usr.PHNO],(error, results, fields) => {
        if(!error){
            res.send('updated successfully');
        } else {
            console.log(error);
        }
    })
})


Router.post('/login', function(req, res) {
     
    const { email, password } = req.body;
    if (email && password) {
      mysqlConnection.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
  
        function(error, results, fields) {
          if (results.length > 0) {
            const newUserJson = JSON.parse(results[0].USER_ID);
            console.log(email, password)
            const userID = newUserJson
            console.log(userID);
            
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({userID}, process.env.JWT_SECRET, {
              expiresIn: '10h'
            });

            res.cookie('token', token, 
            { maxAge: 1000000})
            //res.redirect(302,'localhost:3001/welcomePage')
           
            // localStorage.setItem('TokenID',token);
            // WHat should I do ? Run the program and demosn
            // let headers = new Headers()
            // var abc = localStorage.getItem('TokenID');
            // headers.append('Autherization',abc);
            // console.log(abc)
            // http.method('/places',{headers:headers}).then(result=>{
            //     console.log(result);
            // });

           // return res.redirect('localhost:3001/welcomePage',302)
          } else {
            res.send({error: {message: 'Invalid credentials!'}});
          }
        }
      );
    } else {
      res.send({message: 'Please enter Username and Password!'});
    }
});
module.exports = Router; 