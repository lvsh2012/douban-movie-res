var conf = {
    movie_res:'https://task.muwei3.com/index.php/movie/show/res/',
    movie_opt:'https://task.muwei3.com/index.php/douban/res/opt'
}

function urlcheck(){
    var url = window.location.href;
    var reg = /movie\.douban\.com\/subject\/\d+/;
    if(reg.test(url)){
        var result = url.match(/subject\/\d+/);
        var movieid = result[0].replace("subject/", "");
        res(movieid);
    }
}
function init(){
    urlcheck();
}

function res(movieid){
     var movieResHtml = "<div class='muwei3-movie-res'>\
                       <h3 class='online-title'>在线观看</h3>\
                       <div class='muwei3-movie-online'></div>\
                       <h3 class='download-title'>资源下载</h3>\
                       <div class='muwei3-movie-download'></div>\
                       </div>";
    $(".aside").prepend(movieResHtml);

    $.ajax({
             url:conf.movie_res+movieid,
             dataType:"jsonp",
             jsonp:"jsonpcallback",
             jsonpCallback:'callback',
             success:function(json){
              if(json.status == 0){
                $.each(json.data.online,function(k,v){
                  $(".muwei3-movie-online").append("<a href='"+v.url+"'>"+v.title+"</a>")
                })
                $.each(json.data.download,function(k,v){
                  $(".muwei3-movie-download").append("<a href='"+v.url+"'>"+v.title+"</a>")
                })
              }
             }
        });

}

function opt(){
    $.post(conf.movie_opt,function(json){
        
    },'json');
}

init();

