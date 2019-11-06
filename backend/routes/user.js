require('dotenv').config();
const express = require("express");
const Router = express.Router();
const mysqlConnection = require('../connection');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const session = require('express-session')

Router.use(bodyParser.json());      
Router.use(cookieParser());




// var express 



// app.get('/login', function (req, res) {
//     if (!req.query.username || !req.query.password) {
//       res.send('login failed');    
//     } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
//       req.session.user = "amy";
//       req.session.admin = true;
//       res.send("login success!");
//     }
//   });



// Router.use(session ,{
//     'user_id':'dasfas'
// })

// Router.get('/session', (req, res, next) => {
//     console.log(session)
//     res.send('session', res)
// })
// Router.use(session({
//     secret: 'keyboard cat',
//     name: 'abcdefg',
//     //store: sessionStore, 
//     proxy: true,
//     resave: true,
//     saveUninitialized: true
//   }))

//  function send  ({ email })  {
//     console.log('emai
    
//      new Promise((resolve, reject) => {
//       sgMail.send(message, (error, info) =>
//         error ? reject(error) : resolve(info)
//       )
//     })
//   }

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



// login authentic 
Router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    
	 if (email && password) {
		mysqlConnection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            let RawData = JSON.stringify(results)
            let newUserJson = JSON.parse(RawData); 
            let user_id;
			if (results.length > 0) {
                let currentUserId=newUserJson[0].USER_ID;
                
                req.session.userId = currentUserId
             
                res.send({ message: "login successful!", userId: req.session.userId});
            } else {
                res.send({ message:'Incorrect Username and/or Password!'});
			}			
		});
	} else {
		res.send({message:'Please enter Username and Password!'});
	}
});

Router.get('/content', function(req, res) {
    if(req.session.userId === 47) res.send("Yess! You're the one")
})

Router.get('/session', function(req, res){
    console.log('hey')
    console.log(req.session)
})

module.exports = Router;