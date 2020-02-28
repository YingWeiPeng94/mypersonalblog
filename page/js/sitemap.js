var blogList = new Vue({
    el:"#blogList",
    data:{
        blogList:[]
    },
    created(){
        console.log(1)
        axios({
            method:"get",
            url:"/queryAllBlog",
        }).then(function(resp){
            // console.log(resp.data.data)
            var result = resp.data.data
            
            for (var i=0;i<result.length;i++){
                result[i].link = "/blog_detail.html?bid=" + result[i].id;
            }
            blogList.blogList=result
        }).catch(function(error){
            console.log(error)
        })
    }
})
// console.log(1)