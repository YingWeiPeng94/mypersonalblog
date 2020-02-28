var dbutil = require("./dbutil");
function queryCommentsCountByBlogId(blogId,success){//查询blog总数
    var connection = dbutil.createConnection()
    var querySql = "select count(1) as count from comments where blog_id = ?"
    var params = [blogId]
    connection.connect()
    connection.query(querySql,params,function(error,res){
        if(error == null){ 
            success(res)
        } else {
            console.log(error)
        }
    })
    connection.end()
}
function queryNewComments(success){//查询最新评论
    var connection = dbutil.createConnection()
    var querySql = "select * from comments order by id desc limit 10"
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
function addComment(blogId,parent,parentName,userName,email,comments,ctime,utime,success){
    var connection = dbutil.createConnection();
    var params = [blogId,parent,parentName,userName,email,comments,ctime,utime]
    var insertSql = "insert into comments(`blog_id`,`parent`,`parent_name`,`user_name`,`email`,`comments`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?)"
    connection.connect();
    connection.query(insertSql,params,function(error,result){
        if(error==null){
            success(result)
        }else{
            console.log(error)
        }
    })
    connection.end();
}
function queryCommentsByBlogId(BlogId,success){//根据blogid查询评论总数
    var connection = dbutil.createConnection();
    var querySql = "select * from comments where blog_id = ?";
    var params = [BlogId];
    connection.connect();
    connection.query(querySql,params,function(error,res){
        if(error == null){ 
            success(res);
        } else {
            console.log(error);
        }
    })
    connection.end()
}
// queryCommentsCountByBlogId(11,function(result){console.log(result)})
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId
module.exports.queryCommentsByBlogId = queryCommentsByBlogId
module.exports.addComment = addComment;
module.exports.queryNewComments = queryNewComments