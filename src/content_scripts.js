var conf = {
    movie_res:'https://task.muwei3.com/index.php/movie/show/res/',
    movie_opt:'https://task.muwei3.com/index.php/douban/res/opt'
}

function urlcheck(){
    var url = window.location.href;
    var regMovieDetails = /movie\.douban\.com\/subject\/\d+/;
    var regFm = /douban\.fm\/mine\/\#\!type\=liked/;
    if(regMovieDetails.test(url)){
        var result = url.match(/subject\/\d+/);
        var movieid = result[0].replace("subject/", "");
        res(movieid);
    }else if(regFm.test(url)){
	   doubanFM();
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

function doubanFM(){
	$("#navigation").append('<li style="background: rgb(255, 255, 255);"><a href="javascript:" id="export-liked" style="color: red;">导出红心</a></li>');
}

function get_cookie(name){
	var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg)){
		return unescape(arr[2]);
	}
	else{
		return null;
	}
	
}

init();

$(function(){
    

	// 导出豆瓣红心
	$(document).on('click','#export-liked',function(){
        var start = 0;
        var text  = "<so>";
        var total = 0;
        var per = 0;
        var ck  = get_cookie("ck");
        var spbid = encodeURIComponent("::"+get_cookie("bid"));
        window.$("#export-liked").html("玩命导出中...");
        $.ajax({
        	type: "get",
		    url: "https://douban.fm/j/play_record?ck="+ck+"&spbid="+spbid+"&type=liked&start=0",
		    cache:false,
		    async:false,
		    dataType:"json",
		    success: function(json){
        		total = json.total;
        		per   = json.per_page;
		    } 
		});

        for(start = 0; start < total; start+=per){
        	$.ajax({
	        	type: "get",
			    url: "https://douban.fm/j/play_record?ck="+ck+"&spbid="+spbid+"&type=liked&start="+start,
			    cache:false,
			    async:false,
			    dataType:"json",
			    success: function(json){
			    	$.each(json.songs,function(k,v){
						text += '<so  name="'+v.title+'" artist="'+v.artist+'"  album="'+v.subject_title+'"></so>';
			    	})
	        		
			    } 
			});

        }
        text += "<so>";
        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "豆瓣红心歌单.kwl");
		window.$("#export-liked").html("导出红心");
    })
})

