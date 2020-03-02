var blogComments = new Vue({
    el: "#blogComments",
    data: {
        total: null,
        comments: [{
                id: "1",
                name: "panda",
                ctime: "12345",
                comments: "aasdadafaa"
            },
            {
                id: "1",
                name: "panda",
                ctime: "12345",
                comments: "aasdadafaa"
            },
            {
                id: "1",
                name: "panda",
                ctime: "12345",
                comments: "aasdadafaa"
            },
        ]
    },
    computed:{
        reply:function(){
            return function(commentId,userName){//评论回复功能

                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#sendComment";
            }
        }
    },
    created() {
        
        // var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
        // //获取url参数
        // if (searchUrlParams == "") {
        //     return
        // } else {
            var bid = -2; //-1代表关于页面的评论
        //     for (var i = 0; i < searchUrlParams.length; i++) {
        //         if (searchUrlParams.split("=")[0] == "bid") {
        //             try {
        //                 bid = parseInt(searchUrlParams.split("=")[1])
        //                 // console.log(bid)
        //             } catch (e) {
        //                 console.log(e)
        //             }
        //         }
        //     }
        // }
        axios ({
            method:"get",
            url:"/queryCommentsByBlogId?bid=" + bid,
        }).then(function(resp){
            // console.log(resp.data.data)
            blogComments.comments = resp.data.data
            for (var i = 0;i<blogComments.comments.length; i++){
                if(blogComments.comments[i].parent > -1){
                    blogComments.comments[i].options="回复@" + blogComments.comments[i].parent_name;
                }
            }
            
        }).catch(function(error){
            console.log(error)
        })
        axios({
            method:"get",
            url:"/queryCommentsCountByBlogId?bid="+bid
        }).then(function(resp){
            // console.log(resp.data.data[0])
            blogComments.total = resp.data.data[0].count
        })
    },
   
})
var send_comment = new Vue({
    el: "#sendComment",
    data: {
        vcode: null,
        rightCode: null,
    },
    methods: {

    },
    computed: {
        changeCode: function () { //刷新验证码
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (resp) {
                    send_comment.vcode = resp.data.data.data
                    send_comment.rightCode = resp.data.data.text
                })
            }

        },
        sendComment: function () { //添加评论

            return function () {
                var code = document.getElementById("comment_code").value
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
                if (code.toLowerCase() != this.rightCode.toLowerCase()) {
                    alert("验证码错误")
                    return
                }
                    var bid = -2;//-2代表留言的评论

                    var reply = document.getElementById("comment_reply").value
                    var parentName = document.getElementById("comment_reply_name").value
                    var name = document.getElementById("comment_name").value
                    var email = document.getElementById("comment_email").value
                    var content = document.getElementById("comment_content").value
                    axios({
                        method: "get",
                        url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&comments=" + content+"&parentName="+parentName
                    }).then(function (resp) {
                        // console.log(resp)
                        window.location.reload();
                        alert("评论成功")
                    })

                // }
            }

        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryRandomCode"
        }).then(function (resp) {
            send_comment.vcode = resp.data.data.data
            send_comment.rightCode = resp.data.data.text
        })

    }
})