var getNow = require("../util/nowTimeUtil")
var everyDayDao = require("../dao/everyDayDao")
var respUtil = require("../util/RespUtil")
var path = new Map();

function editEveryDay(request, response) {
    request.on("data", function (data) {
        everyDayDao.insertEveryDay(data.toString().trim(), getNow.getNow(), function (res) {
            // console.log(res)
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null))
            response.end();
        });
        // console.log(data.toString().trim( ))

    })
}
path.set("/editEveryDay", editEveryDay)

function queryEveryDay(request, response) {
    
        everyDayDao.queryEveryDay(function (result) {
            response.writeHead(200);
            // console.log(result)
            response.write(respUtil.writeResult("success", "添加成功", result))
            response.end();
        })
        // console.log(data.toString().trim( ))

    
}
path.set("/queryEveryDay", queryEveryDay)
module.exports.path = path