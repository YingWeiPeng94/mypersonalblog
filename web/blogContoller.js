var blogDao = require("../dao/blogDao");
var timeUtil = require("../util/nowTimeUtil")
var respUtil = require("../util/RespUtil")
var tagsDao = require("../dao/tagsDao")
var tagBlogMapping = require("../dao/tagBlogMappingDao")
var url = require("url");
var path = new Map();
function queryBlogByTagMap(request,response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByTag(+params.page,+params.pageSize,params.tag,function(result){
        response.writeHead(200);
        for (var i=0;i<result.length;i++){
            
            result[i].content = result[i].content.replace(/<\/?[^>]*>/g,"")
            // 过滤html标签
        }
        response.write(respUtil.writeResult("success","添加成功",result))
        response.end();
    })
}
path.set("/queryBlogByTagMap",queryBlogByTagMap)
function queryBlogCountByTag(request,response){
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogCountByTag(params.tag,function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result));
        response.end()
        
    })
}
path.set("/queryBlogCountByTag",queryBlogCountByTag)
function queryHotBlog(request,response){
    blogDao.queryHotBlog(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result))
        response.end()
    })
}
path.set("/queryHotBlog",queryHotBlog)
function queryAllBlog(request,response){
    blogDao.queryAllBlog(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result))
        response.end()
    })
}
path.set("/queryAllBlog",queryAllBlog)
function queryBlogById(request,response){//通过文章查询blog
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogById(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result));
        response.end()
        blogDao.addViews(parseInt(params.bid),function(result){
            // console.log(1)
        })
    })
}
path.set("/queryBlogById",queryBlogById)
function queryBlogCount(request,response){
    blogDao.queryBlogCount(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result));
        response.end()
        
    })
}
path.set("/queryBlogCount",queryBlogCount)
function queryBlogByPage(request,response){
        var params = url.parse(request.url, true).query;
        blogDao.queryBlogBypage(+params.page,+params.pageSize,function(result){
            response.writeHead(200);
            for (var i=0;i<result.length;i++){
                
                result[i].content = result[i].content.replace(/<\/?[^>]*>/g,"")
                // 过滤html标签
            }
            response.write(respUtil.writeResult("success","添加成功",result))
            response.end();
        })
}
path.set("/queryBlogByPage",queryBlogByPage)
function editBlog(request, response) {
    // console.log(url.parse)
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace("，", ",")
    request.on("data", function (data) {
        blogDao.insertBlog(params.title, 0, tags, timeUtil.getNow(), timeUtil.getNow(), data.toString(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null))
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for (var i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                } else {
                    queryTag(tagList[i], blogId)
                }
            }
        })
    })
}

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId)//没有标签则插入标签及映射
        } else {
            insertTagBlogMapping(result[0].id, blogId)
        }
    })
}

function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId)
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMapping.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(),function(result){
        console.log(result)
    })
}

path.set("/editBlog", editBlog)
module.exports.path = path;