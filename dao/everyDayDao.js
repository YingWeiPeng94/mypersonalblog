var dbutil = require("./dbutil")
function insertEveryDay(content,ctime,success){
    var insertSql = "insert into every_day(`content`,`ctime`) values (?,?)";
    var params = [content,ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,res){
        if(error == null){
            success(res)
        } else {
            console.log(error)
        }
    })
    connection.end()
}
function queryEveryDay(success){
    var insertSql = "select * from every_day order by id desc limit 1";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result){
        if(error == null){
            success(result)
        } else {
            console.log(error)
        }
    })
    connection.end()
}
// queryEveryDay(function(res){console.log(res)})
module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;
// insertEveryDay('12341','1',function(res){console.log(res)})