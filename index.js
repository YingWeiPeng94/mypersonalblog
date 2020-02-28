var express = require("express");
var globalConfig = require("./config")
var loader = require("./loader")

var app = new express();

app.post('/editEveryDay',loader.get("/editEveryDay"))//写每日一句
app.post("/editBlog",loader.get("/editBlog"));//编写blog

app.get('/queryEveryDay',loader.get("/queryEveryDay"))//获得每日一句
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"))//按页查询blog
app.get("/queryBlogCount",loader.get("/queryBlogCount"))//获得博客总数
app.get("/queryBlogById",loader.get("/queryBlogById"))//按id查询blog
app.get("/queryRandomCode",loader.get("/queryRandomCode"))//获得随机验证码

app.get("/addComment",loader.get("/addComment"))//添加评论
app.get("/queryCommentsByBlogId",loader.get("/queryCommentsByBlogId"))//根据blogid查询评论
app.get("/queryCommentsCountByBlogId",loader.get("/queryCommentsCountByBlogId"))//根据blogid查询当前blog的评论总数
app.get("/queryAllBlog",loader.get("/queryAllBlog"))//查询所有blog
app.get("/queryHotBlog",loader.get("/queryHotBlog"))//热门blog查询
app.get("/queryNewComments",loader.get("/queryNewComments"))//查询最新评论
app.get("/queryRandomTags",loader.get("/queryRandomTags"))

app.get("/queryBlogByTag",loader.get("/queryBlogByTag"))
app.get("/queryBlogBySearchData",loader.get("/queryBlogBySearchData"))//搜索

app.use(express.static(globalConfig["page_path"]))
const server = app.listen(globalConfig["port"], function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log("主机",host)
    console.log("端口",port)
    console.log('服务器已启动')
})
