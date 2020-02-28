var dbutil = require("./dbutil")
function insertTagBlogMapping(tagId,blogId,ctime,utime,success){
    var insertSql = "insert into tag_blog_mapping(`tag_id`,`blog_id`,`ctime`,`utime`) values (?,?,?,?)";
    var params = [tagId,blogId,ctime,utime];
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
function queryByTagId(tagId,page,pageSize,success){//按照标签的id找到映射的blogId
    var connection = dbutil.createConnection();
    var querySql = "select * from tag_blog_mapping where tag_id=? order by id desc limit ?,? "
    var params = [tagId,page,pageSize]
    // var querySql = "select * from blog order by tags=? desc limit ?,?"
    connection.connect()
    connection.query(querySql, params,function(error,result){
        if(error == null){ 
            success(result)
        } else {
            console.log(error)
        }
    })
    connection.end()
}
module.exports.queryByTagId = queryByTagId;
module.exports.insertTagBlogMapping = insertTagBlogMapping;