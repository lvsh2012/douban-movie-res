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

function httpRequestGet(callback,url){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(data) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				callback(data);
			} else {
				callback(null);
			}
		}
	}
	xhr.open('GET', url, true);
	xhr.send();	
}

function resShow(json){
    if(json.status == 0){
	
		var onlineHtml = "";
		if(!$.isEmptyObject(json.data.online)){
			onlineHtml = "<h3 class='online-title'>在线观看</h3><div class='muwei3-movie-online'></div>";
		}
		downloadHtml = "";
		if(!$.isEmptyObject(json.data.download)){
			var downloadHtml = "<h3 class='download-title'>资源下载</h3><div class='muwei3-movie-download'></div>";
		}
		var movieResHtml = "<div class='muwei3-movie-res'>"+onlineHtml+downloadHtml+"\
					   <div class='muwei3-right'><a href='http:www.muwei3.com' target='_blank'>木卫三</a></div>\
                       </div>";
		$(".aside").prepend(movieResHtml);
        $.each(json.data.online,function(k,v){
            $(".muwei3-movie-online").append("<div><a href='"+v.url+"' target='_blank'>"+v.title+"</a></div>")
        })
        $.each(json.data.download,function(k,v){
            $(".muwei3-movie-download").append("<div><a href='"+v.url+"' target='_blank'>"+v.title+"</a></div>")
        })
    }
}

function res(movieid){
	var url = conf.movie_res+movieid;
	httpRequestGet(resShow,url)
}

function opt(){
    $.post(conf.movie_opt,function(json){
        
    },'json');
}

init();

