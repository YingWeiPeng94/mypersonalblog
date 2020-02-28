var fs = require("fs");
var globalConfig = require("./config");
var files = fs.readdirSync(globalConfig["web_path"])
// console.log(file)

var pathMap = new Map()
for(var i = 0; i < files.length; i++){
    var temp = require(globalConfig["web_path"]+"/"+files[i])
    for(var [key,value] of temp.path){
        // console.log(key,value)
        if(pathMap.get(key) == null){
            pathMap.set(key,value)
        }else{
            throw new Error("url path 异常 url:" + key)
        }
    }
    // console.log(temp)
}
module.exports = pathMap;