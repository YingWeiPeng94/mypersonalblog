var blogDao = require("../dao/blogDao");
var timeUtil = require("../util/nowTimeUtil")
var respUtil = require("../util/RespUtil")
var tagsDao = require("../dao/tagsDao")
var tagBlogMappingDao = require("../dao/tagBlogMappingDao")
var url = require("url");
var path = new Map();

function queryRandomTags(request, response) {
    tagsDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result))
        response.end()
    })
}

path.set("/queryRandomTags", queryRandomTags)

function queryBlogByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function (result) {
        //查询是否有这个标签
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "请求成功", result))
            response.end()
        } else {
            tagBlogMappingDao.queryByTagId(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
                //通过映射关系找到标签对应的blogid，再查询到所有的blog
                var dataLength = result.length
                var blogList = [];
                for (var i = 0; i < dataLength; i++) {
                    blogDao.queryBlogById(result[i].blog_id,function(result){

                        blogList.push(result[0])
                        response.writeHead(200);
                        response.write(respUtil.writeResult("success", "请求成功", blogList))
                        response.end()
                    })
                }
                // console.log(blogList)
                
               
            })

            
            // for (result)
            // tagBlogMappingDao.queryByTagId()
        }
    })
}
path.set("/queryBlogByTag", queryBlogByTag)
module.exports.path = path;