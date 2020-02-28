var dbutil = require("./dbutil");

function queryBlogCountByTag(tag,success){//按照标签查询blog总数
    var connection = dbutil.createConnection()
    var querySql = "select count(1) as count from blog order by tags=?";
    var params = [tag];
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

function queryHotBlog(success){//降序查询blog最新热门
    var connection = dbutil.createConnection();
    var querySql = "select * from blog order by views desc limit 10;"
    // var params = [bid]
    connection.connect();
    connection.query(querySql,function(error,result){
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    })
    connection.end();
}
function addViews(bid,success){//更新浏览次数
    var connection = dbutil.createConnection();
    var querySql = "update blog set views = views + 1 where id = ?"
    var params = [bid]
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    })
    connection.end();
}
function queryAllBlog(success){
    var connection = dbutil.createConnection();
    var querySql = "select * from blog"
    connection.connect();
    connection.query(querySql,function(error,result){
        if(error == null){
            success(result)
        }else{
            console.log(error)
        }
    })
    connection.end();
}
function queryBlogById(id,success){//通过id查询单个blog
    var connection = dbutil.createConnection();
    var querySql = "select * from blog where id = ?";
    var params = [id];
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
function queryBlogCount(success){//查询blog总数
    var connection = dbutil.createConnection()
    var querySql = "select count(1) from blog"
    // var params = [page*pageSize,pageSize]
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
function insertBlog(title,views,tags,ctime,utime,content,success){
    var connection = dbutil.createConnection()
    var insertSql = "insert into blog(`title`,`views`,`tags`,`ctime`,`utime`,`content`) values(?,?,?,?,?,?) "
    var params = [title,views,tags,ctime,utime,content]
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
function queryBlogBypage(page,pageSize,success){//分页查询blog
    var connection = dbutil.createConnection()
    var querySql = "select * from blog order by id desc limit ?,?"
    var params = [page*pageSize,pageSize]
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
// queryBlogCount(function(res){console.log(res)})
module.exports.insertBlog = insertBlog;
module.exports.queryBlogBypage = queryBlogBypage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
module.exports.queryBlogCountByTag = queryBlogCountByTag

// queryBlogBypage(0,5,function(res){console.log(res)})