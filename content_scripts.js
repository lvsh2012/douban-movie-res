var conf = {
    movie_res:'http://movie.muwei3.com/douban/res/fetch',
    movie_opt:'http://movie.muwei3.com/douban/res/opt'
}

function urlcheck(){
    var url = window.location.href;
    var reg = /movie\.douban\.com\/subject\/\d+/;
    if(reg.test(url)){
         res();
    }
}
function init(){
    urlcheck();
}

function res(){
     var movieResHtml = "<div class='muwei3-movie-res'>\
                       <h3 class='online-title'>在线观看</h3>\
                       <div class='muwei3-movie-online'></div>\
                       <h3 class='download-title'>资源下载</h3>\
                       <div class='muwei3-movie-download'></div>\
                       </div>";
    $(".aside").prepend(movieResHtml);
    $.post(conf.movie_res,function(json){
        
    },'json');
}

function opt(){
    $.post(conf.movie_opt,function(json){
        
    },'json');
}

init();

