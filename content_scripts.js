var conf = {
    movie:{
        res:'http://movie.muwei3.com/douban/res/fetch',
        opt:'http://movie.muwei3.com/douban/res/opt'
    }
}

function urlcheck(){
    var url = window.location.href;
    var reg = /movie\.douban\.com\/subject/\d+$/; 
    if(reg.test(obj)){   
         res();
    }
}
function init(){

}

function res(){
     var movieResHtml = "<div class='muwei3-movie-res'>\
                       <h3 class='online-title'>在线观看</h3>\
                       <div class='muwei3-movie-online'></div>\
                       <h3 class='download-title'>资源下载</h3>\
                       <div class='muwei3-movie-download'></div>\
                       </div>";
    $(".aside").prepend(movieResHtml);
    $.post(conf.res,function(json){
        
    },'json');
}

function opt(){
    $.post(conf.opt,function(json){
        
    },'json');
}

init();

