var fs = require("fs");
var globalConfig = {};
var conf = fs.readFileSync("./server.config");
// console.log(typeof(conf.toString()))
var arr = conf.toString().split("\r\n");
// console.log(arr)
for(var i = 0 ;i<arr.length;i++){
    globalConfig[arr[i].split('=')[0].trim()]=arr[i].split('=')[1].trim()
}
// console.log(globalConfig)
module.exports=globalConfig