 const mysql = require("mysql2");
var mysqlconnection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database:"task1",
    multipleStatements: true
});
mysqlconnection.connect((err) => {
    if (!err) {
        console.log("Connected db");
    } else {
        console.log(err);
    }
})
module.exports=mysqlconnection;