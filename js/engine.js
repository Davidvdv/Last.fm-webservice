$(function(){
	$.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=jonne7&format=json&api_key=b25b959554ed76058ac220b7b2e0a026', function(data){
		console.log(data);
		alert( data.weeklytrackchart.track[0].artist);
		console.log(data.weeklytrackchart.track[0].name);
	});
});