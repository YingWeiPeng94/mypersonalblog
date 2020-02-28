var dbutil = require("./dbutil");
function insertTag(tag,ctime,utime,success){
    var connection = dbutil.createConnection()
    var insertSql = "insert into tags(`tag`,`ctime`,`utime`) values(?,?,?) "
    var params = [tag,ctime,utime];
    connection.connect()
    connection.query(insertSql, params,function(error,res){
        if(error == null){ 
            success(res)
        } else {
            console.log(error)
        }
    })
    connection.end()
}
function queryTag(tag,success){//条件查询标签
    var connection = dbutil.createConnection()
    var querySql = "select * from tags where tag =?"
    var params = [tag];
    connection.connect()
    connection.query(querySql, params,function(error,res){
        if(error == null){ 
            success(res)
        } else {
            console.log(error)
        }
    })
    connection.end()
}
function queryAllTag(success){//条件查询标签
    var connection = dbutil.createConnection()
    var querySql = "select * from tags "
    // var params = [tag];
    connection.connect()
    connection.query(querySql,function(error,res){
        if(error == null){ 
            success(res)
        } else {
            console.log(error)
        }
    })
    connection.end()
}
module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag