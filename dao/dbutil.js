var mysql = require("mysql");
function createConnection(){
    var connection = mysql.createConnection({
        host:"127.0.0.1",
        port:"3306",
        user:"root",
        password:"YING65123478",
        database:"my_blog"
    })
    return connection;
}
// console.log(createConnection())
module.exports.createConnection = createConnection