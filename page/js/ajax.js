function ajax(method,url){
    var xml = new XMLHttpRequest();
    xml.open(method,url,true);
    xml.send();
    console.log(xml.responseText)
//    return xml.responseText
}