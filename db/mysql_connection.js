let mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sowtex_backend'
})

connection.connect(function(err){
    if(err) throw err;
    console.log("connected");

});


module.exports.connection = connection;