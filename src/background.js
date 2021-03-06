﻿function getDomainFromUrl(url){
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
    var curDomain = getDomainFromUrl(tab.url).toLowerCase();
	if(curDomain.indexOf('douban.') != -1){
		chrome.pageAction.show(tabId);
	}
};
  
chrome.tabs.onUpdated.addListener(checkForValidUrl);
