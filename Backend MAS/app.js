const express = require('express');
const app = express();
const port = 9900;
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const mongoUrl = "mongodb://localhost:27017";
const DBname = 'MyAnalyticsSchool';
const chalk = require('chalk');



const cors = require('cors')
const bodyParser = require('body-parser');
let database;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors())
// main page
app.get('/', (req,res)=>{
    res.send("<div><a href='http://localhost:9900/login'>Login</a><br><a href='http://localhost:9900/signup'>Signup</a>")
})


// // login page
// app.get('/login', (req,res)=>{
//   database.collection('Login').find({}).toArray((err,result)=>{
//       if(err) throw err
//       res.send(result)
//   })  
// })

// // sign up page
// app.get('/signup', (req,res) =>{
//     database.collection('signup').find({}).toArray((err,result)=>{
//         if(err) throw err;
//         res.send(result);
//     })
// })

// login post api

app.post('/login', (req,res)=>{
    database.collection('Login').insertOne(req.body,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            res.send('Data Added')
        }
    })
})

// sign up post api

app.post('/signup', (req,res)=>{
    database.collection('signup').insertOne(req.body,(err,result)=>{
        if(err){
            
         throw err
        }
        else{
        res.send('Data Added')
        }
    })
})


mongoClient.connect(mongoUrl, (err,db)=>{
    if(err) throw err;
    database = db.db(DBname)
    app.listen(port, (err)=>{
        if(err) throw err;
        console.log(chalk.blue(`Your Node Server is running at port ${port}`))
})
})