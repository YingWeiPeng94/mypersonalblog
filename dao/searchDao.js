var dbutil = require("./dbutil")
function queryBlogBySearchData(val,page,pageSize,success){
    var connection = dbutil.createConnection();
    var querySql = "select * from blog where title like ? order by id desc limit ?,?";
    var params = ['%'+val+'%',page,pageSize];
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result)
        } else {
            console.log(error)
        }
    })
    connection.end()
}
// queryBlogBySearchData("s",0,5,function(result){console.log(result)})
module.exports.queryBlogBySearchData = queryBlogBySearchData