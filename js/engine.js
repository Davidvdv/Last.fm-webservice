$(function(){
	
	
	$.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=jonne7&format=json&api_key=b25b959554ed76058ac220b7b2e0a026', function(data){
		
		console.log(data.weeklytrackchart);
		
		for(i in data.weeklytrackchart.track)
		{	tr = data.weeklytrackchart.track[i].name;
			ar = data.weeklytrackchart.track[i].artist["#text"];
			
			$.getJSON('http://ws.audioscrobbler.com/2.0/',{method:'track.getInfo', api_key: 'b25b959554ed76058ac220b7b2e0a026', artist:ar, track:tr}, function(d){
				console.log('something');
				console.log(d);
			});
		}
		
		

		
	});
});