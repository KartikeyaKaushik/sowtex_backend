let exp = require('express');
let server = exp();
let rout = exp.Router();
let path = require('path');
let bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
var cookieParser = require('cookie-parser');
let mysql = require('./db/mysql_connection.js').connection;

server.use(cookieParser());
server.use(exp.static('../frontend/src/assets'));
server.use('/upload', exp.static('../frontend/public/uploads'));

// mysql APIs
rout.post('/user', async (req, res)=>{
    const{username, first_name, last_name, email, address, password, confirm_password} = req.body;
    try{
        if(!username || !first_name || !last_name || !email || !address || !password || !confirm_password){
            res.json({err: "please fill all fields"});
        }
        if(!(password==confirm_password)){
            res.json({err:"confirm password should match password"});
        }
        let data = mysql.query('insert into users (username, first_name, last_name, email, address, password, confirm_password) values(?,?,?,?,?,?,?)', [username, first_name, last_name, email, address, password, confirm_password], function(err, result){
            if(err) throw err;
            res.json({msg:"data inserted"});
        });
    }
    catch(error){
        console.log(error);
    }
})

rout.get('/user', async (req,res)=>{
    try{
        let data = mysql.query('select * from users', function(err, result){
            if(err) throw err;
            res.json({data2:result});
        })
    }
    catch(error){
        console.log(error);
    }
})







server.use(exp.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use('/',rout);
const PORT = process.env.PORT;
server.listen(PORT,()=>console.log(`server running at ${PORT}`));  