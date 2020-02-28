function getNow(){
    var time = parseInt(new Date().getTime()/1000)
    return time;
}
module.exports.getNow = getNow
