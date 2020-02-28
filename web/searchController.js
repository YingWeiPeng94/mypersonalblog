var blogDao = require("../dao/blogDao");
var timeUtil = require("../util/nowTimeUtil")
var respUtil = require("../util/RespUtil")
var tagsDao = require("../dao/tagsDao")
var searchDao = require("../dao/searchDao")
var tagBlogMapping = require("../dao/tagBlogMappingDao")
var url = require("url");
var path = new Map();
function queryBlogBySearchData(request,response){
    var params = url.parse(request.url,true).query;
    console.log(params)
    searchDao.queryBlogBySearchData(params.s,parseInt(params.page),parseInt(params.pageSize),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result))
        response.end()
    })
}
path.set("/queryBlogBySearchData",queryBlogBySearchData)
module.exports.path = path