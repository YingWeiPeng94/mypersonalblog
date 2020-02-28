const everyDay = new Vue({
    // 每日一句
    el:'#every-day',
    data:{
        content:"asssssssssdasdwjoiajsdj",
    },
    computed:{
        getContent(){
            return this.return;
        }
    },
    
    created(){
        axios({
            method:"get",
            url:"/queryEveryDay",
        }).then(function(resp){
            everyDay.content = resp.data.data[0].content
            // console.log(resp.data.data)
        }).catch(function(resp){
            console.log("请求失败")
        })
    }
})
const articleList = new Vue({
    // 文章列表
    el:"#article-list",
    data:{
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
        articleList:[
            // {
            //     title:"Laravel5.4安装passport时遇到的一些问题",
            //     content:"安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。",
            //     date:"2018-10-10",
            //     view:"101",
            //     tags:"test1 test2",
            //     id:"1",
            //     link:"#"
            // },
            // {
            //     title:"Laravel5.4安装passport时遇到的一些问题",
            //     content:"安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。",
            //     date:"2018-10-10",
            //     view:"101",
            //     tags:"test1 test2",
            //     id:"1",
            //     link:"#"
            // },
        ],
    },
    methods:{
        jumpTo:function(page){
            this.getPage(page,this.pageSize);
        },
    },
    computed:{
        
        getPage:function(){
            return function(page,pageSize){
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
                //找到url中？后面的参数
                var tag = "";
                var s ="";
                if(searchUrlParams.split("=")[0] == "s"){//搜索查询
                    try {
                        s = searchUrlParams.split("=")[1]
                    } catch (e) {
                        console.log(e)
                    }
                    console.log(s)
                    axios({
                        method:"get",
                        url:"/queryBlogBySearchData?page=" + (page-1) + "&pageSize=" + pageSize + "&s=" + s,
                    }).then(function(resp){
                        var result = resp.data.data;
                        var list=[];
                        for (var i = 0; i < result.length;i++){
                            var temp = {};
                            temp.content = result[i].content;
                            temp.title = result[i].title;
                            temp.date = (new Date(result[i].ctime*1000)).toDateString();
                            temp.view = result[i].views;
                            temp.tags = result[i].tags;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            temp.id = result[i].id;
                            list.push(temp);
                        }
                        articleList.page = page
                        articleList.articleList = list;
                    }) 
                    return
                }
                if (searchUrlParams.split("=")[0] == "tag") {
                    try {
                        tag = searchUrlParams.split("=")[1]
                    } catch (e) {
                        console.log(e)
                    }
                } 
                if(tag == ""){
                    axios({
                        method:"get",
                        url:"/queryBlogByPage?page="+(page-1)+"&pageSize="+pageSize
                    }).then(function(resp){
                        var result = resp.data.data;
                        var list=[];
                        for (var i = 0; i < result.length;i++){
                            var temp = {};
                            temp.content = result[i].content;
                            temp.title = result[i].title;
                            temp.date = (new Date(result[i].ctime*1000)).toDateString();
                            temp.view = result[i].views;
                            temp.tags = result[i].tags;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            temp.id = result[i].id;
                            list.push(temp);
                        }
                        articleList.page = page
                        articleList.articleList = list;
                    })
                    axios({
                        method:"get",
                        url:"/queryBlogCount",
                    }).then(function(resp){
                        // console.log(resp.data.data[0]["count(1)"])
                        articleList.count =  resp.data.data[0]["count(1)"]
                        // articleList.count =50;
                        articleList.generatePageTool;
                    })
                }else{
                    // axios({
                    //     method:"get",
                    //     url:"/queryBlogCountByTag?tag="+tag,
                    // }).then(function(resp){
                    //     // console.log(resp.data.data[0]["count(1)"])
                    //     articleList.count =  resp.data.data[0]["count(1)"]
                    //     // articleList.count =50;
                    //     articleList.generatePageTool;
                    // })
                    
                    axios({
                        method:"get",
                        url:"/queryBlogByTag?page=" + (page-1) + "&pageSize=" + pageSize + "&tag=" + tag,
                    }).then(function(resp){
                        console.log(resp)
                        var result = resp.data.data;
                        var list=[];
                        for (var i = 0; i < result.length;i++){
                            var temp = {};
                            temp.content = result[i].content;
                            temp.title = result[i].title;
                            temp.date = (new Date(result[i].ctime*1000)).toDateString();
                            temp.view = result[i].views;
                            temp.tags = result[i].tags;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            temp.id = result[i].id;
                            list.push(temp);
                        }
                        articleList.page = page
                        articleList.articleList = list;
                    })
                }
                
                
                
            }
            
        },
        generatePageTool:function (){//分页
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<",page:1});
            if(nowPage > 2){//页数大于2显示当前页的前两页数字
                result.push({text:nowPage - 2,page:nowPage-2})
            }
            if(nowPage > 1){//显示当前页的前一页数字
                result.push({text:nowPage - 1,page:nowPage - 1})
            }
            result.push({text:nowPage,page:nowPage})//当前页数字
            if(nowPage + 1<=(totalCount+pageSize-1)/pageSize){//当前页加1小于总数显示后一页
                result.push({text:nowPage + 1,page:nowPage+1})
            }
            if(nowPage + 2<=(totalCount+pageSize-1)/pageSize){//当前页加2小于总数显示后两页
                result.push({text:nowPage + 2,page:nowPage+2})
            }
            result.push({text:">>",page:parseInt((totalCount+pageSize-1)/pageSize)})
            this.pageNumList = result;
            return result
        }
    },
    created(){
        
        this.getPage(this.page,this.pageSize);
    }
    
}) 
