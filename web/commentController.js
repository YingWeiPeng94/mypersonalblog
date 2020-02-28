var commentDao = require("../dao/commentDao");
var timeUtil = require("../util/nowTimeUtil")
var respUtil = require("../util/RespUtil")
var captcha = require("svg-captcha")//验证码
// var tagsDao = require("../dao/tagsDao")
// var tagBlogMapping = require("../dao/tagBlogMappingDao")
var url = require("url")
var path = new Map();
function queryNewComments(request,response){//查询最新评论
    // var params = url.parse(request.url,true).query;
    commentDao.queryNewComments(function(result){
        response.writeHead(200)        
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end()
    })
}
path.set("/queryNewComments",queryNewComments)
function queryCommentsCountByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentsCountByBlogId(params.bid,function(result){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end()
    })
}
path.set("/queryCommentsCountByBlogId",queryCommentsCountByBlogId)
function queryCommentsByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentsByBlogId(params.bid,function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","评论查询成功",result));
        response.end();
    })
}
path.set("/queryCommentsByBlogId",queryCommentsByBlogId)
function addComment(request,response){//添加评论接口
    var params = url.parse(request.url,true).query
    commentDao.addComment(params.bid,params.parent,parseInt(params.parentName),params.userName,params.email,params.comments,timeUtil.getNow(),timeUtil.getNow(),function(result){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","评论成功",null))
        response.end()
    })
}

path.set("/addComment",addComment)
function queryRandomCode(request,response){//生成随机验证码
    var img = captcha.create({fontSize:50,width:100,height:34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success","刷新成功",img))
    response.end()
}
path.set("/queryRandomCode",queryRandomCode)
module.exports.path = path