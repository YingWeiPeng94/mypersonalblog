// 基础js
var randomTags = new Vue({//随机标签
    el:"#tags",
    data:{
        tags:["asd","skd","ajsin","jsjl","jhf","asd","skd","ajsin","jsjl","jhf","asd","skd","ajsin","jsjl","jhf"]
    },
    computed:{
        randomColor:function(){
            return function(){
                var red = Math.random()*255;
                var green = Math.random()*255;
                var blue = Math.random()*255;
                return "rgb("+red+","+green+","+blue+")"
            }
        },
        randomSize:function(){
            return function(){
                return Math.random() * 20 +12+"px"
            }
        }
    },
    created(){
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then(function(resp){
            
            var result = resp.data.data
            var list = []
            for( var i = 0;i<result.length;i++){
                list.push(result[i].tag)
            }
            // console.log(list)
            randomTags.tags = list
        }).catch(function(error){
            console.log(error)
        })
    }
})
const newHot = new Vue({//最近热门
    el:"#newHot",
    data:{
        titleList:[
            {title:"这是个链接",link:"http://www.baidu.com"},
            {title:"这是个链接",link:"http://www.baidu.com"},
            {title:"这是个链接",link:"http://www.baidu.com"},
            {title:"这是个链接",link:"http://www.baidu.com"},
            {title:"这是个链接",link:"http://www.baidu.com"},
            {title:"这是个链接",link:"http://www.baidu.com"},
            {title:"这是个链接",link:"http://www.baidu.com"},
        ]
    },
    created(){
        axios({
            method:"get",
            url:"/queryHotBlog",
        }).then(function(result){
            // console.log(result)
            var result = result.data.data
            
            for (var i=0;i<result.length;i++){
                result[i].link = "/blog_detail.html?bid=" + result[i].id;
            }
            newHot.titleList = result
        }).catch(function(error){
            console.log(error)
        })
    }
})
const newCommnets = new Vue({
    el:"#new-comments",
    data:{
        commentList:[
            {name:"这是个用户名",data:"2018-10-10",comment:"这是一大出串评论"},
            {name:"这是个用户名",data:"2018-10-10",comment:"这是一大出串评论"},
            {name:"这是个用户名",data:"2018-10-10",comment:"这是一大出串评论"},
            {name:"这是个用户名",data:"2018-10-10",comment:"这是一大出串评论"},
            {name:"这是个用户名",data:"2018-10-10",comment:"这是一大出串评论"},
            {name:"这是个用户名",data:"2018-10-10",comment:"这是一大出串评论"},
            {name:"这是个用户名",data:"2018-10-10",comment:"这是一大出串评论"},
            {name:"这是个用户名",data:"2018-10-10",comment:"这是一大出串评论"},
            {name:"这是个用户名",data:"2018-10-10",comment:"这是一大出串评论"},
            {name:"这是个用户名",data:"2018-10-10",comment:"这是一大出串评论"},
        ]
    },
    created(){
        axios({
            method:"get",
            url:"/queryNewComments"
        }).then(function(resp){
            // console.log(resp)
            newCommnets.commentList = resp.data.data
        })
    }
})
var searchBar = new Vue({
    el:"#searchBar",
    data:{
        content:"",
        page:1,
        pageSize:5,
    },
    watch:{
        content(val){
            axios({
                method:"get",
                url:"/queryBlogBySearchData?data="+val,
            }).then(function(result){
                console.log(result)
               
            }).catch(function(error){
                console.log(error)
            })
        }
    },
    methods:{
        search(){ 
            window.open("?s="+this.content,"_blank");    
        },
    },
    computed:{
    }
    
})
