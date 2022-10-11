const express = require("express");
const path =require("path");
const mysqlconnection = require("./conn");
const app = express();
require("./conn");
var bodyParser = require('body-parser');
 var session =require("express-session");

module.exports = app;


const static_path =path.join(__dirname,"../VIEWS");
app.use(express.static(static_path));
app.set("view engine","hbs");
const async = require("hbs/lib/async");
const { prependOnceListener } = require("process");
const req = require("express/lib/request");
app.use(bodyParser.json());


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../VIEWS")));

app.get("/",(req,res)=> {
//res.send("priti khaire")
res.render("index1");
console.log("connected");
});
app.get('/login', (req, res) => {
    res.render("login");
    console.log("login....");
});

app.get('/welcome', (req, res) => {
    res.render("welcome");
    console.log("welcome....");
});

app.listen(3000);
const Router = express.Router();
//get the all records

app.get('/people',(req,res)=>{
    console.log("sergthsrtwhwsth",req.query)
    console.log("sergthsrtwhwsth",req.body)
    
    mysqlconnection.query('SELECT * FROM task1.people; ',(err,rows,fields)=>{
        if(!err)
        {res.send(rows);
        console.log(rows);}
        else
       { console.log(err);}
    })
});

//get specific record

app.get('/people/:id',(req,res)=>{
    mysqlconnection.query('SELECT * FROM task1.people where id =?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        {res.send(rows);
        console.log(rows);}
        else
       { console.log(err);}
    })
});
//delete 
app.delete('/people/:id',(req,res)=>{
    mysqlconnection.query('DELETE FROM  people where id =? ',[req.params.id],(err,rows,fields)=>{
        if(!err)
        {res.send("DELETE");
        console.log(rows);}
        else
       { console.log(err);}
    })
});

//INSERT RECORD

app.get('/api/people',(req,res)=>{
  
   console.log("req.body",req.query);
    id = req.query.id,
    firstname=req.query.firstname,
    lastname=req.query.lastname,password=req.query.password
    let sql ="INSERT INTO `people`(id,firstname,lastname,password)values(?,?,?,?)";
    let query=mysqlconnection.query(sql,[id,firstname,lastname,password],(err,rows,fields)=>{
            if(!err)

              {res.send(rows);
                res.redirect('/login');
            }
              else
              {console.log(err);}
               });
              
        });
    
        // // var id=req.body.id
        // console.log(req.body);



 


//update
app.put('/people/:id',(req,res)=>{
    id1 = req.body.id,
    firstname=req.body.firstname,
    lastname=req.body.lastname,password=req.body.password;
    let sqlQuery = "UPDATE people SET id=?, firstname=?,lastname=?,password=? where id="+req.params.id;
    let query = mysqlconnection.query(sqlQuery,[id1,firstname,lastname,password], (err, rows,fields) => {
        if(!err) {
      res.send(rows);}
      else{
        console.log(err);
      }
    });
    
 });

app.post('/login', function(req, res) {
    console.log("req.body",req.query)
	// Capture the input fields
	
	let password=req.body.password;
    let id = req.body.id;
    console.log("req.body",req.body)
	if (id  && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
        var sqlQuery1='SELECT * FROM people WHERE id = '+ id + '\
        AND password = '+password;
       //console.log(sqlquery1);
        let query = mysqlconnection.query(sqlQuery1,[id,password], (err, rows,fields)=>{
   // mysqlconnection.query('SELECT * FROM people WHERE id = ? && password = ?', [id, password], function(err, rows, fields){
            // console.log(query);
			// If there is an issue with the query, output the error
			if (err) throw err;
			// If the account exists
			if (rows.length > 0) {
				// Authenticate the user
				//rows.session.loggedin = true;
				req.session.id = id;
				// Redirect to home page
				res.redirect('/welcome');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	 } 
     //else {
	// 	res.send('Please enter Username and Password!');
    //     console.log("Please enter Username and Password!");
	// 	res.end();
	// }
});