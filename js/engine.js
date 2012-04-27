$(document).ready(function(){
	$('#go').click(function(){
		run($('#username').val(););
	});
});

function run(usr){
	
	var username = usr;
	
	window.graphData = new Array();
	window.graphData.push(['Track', 'Duration']);
	var totalPlayTime = 0;
	
	$.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user='+username+'&format=json&api_key=b25b959554ed76058ac220b7b2e0a026', function(data){
		
		for(i in data.weeklytrackchart.track)
		{	
			tr = data.weeklytrackchart.track[i].name;
			pl = data.weeklytrackchart.track[i].playcount;
			ar = data.weeklytrackchart.track[i].artist["#text"];
			
			process(tr, pl, ar);
		}
		
	});
	
	function process(tr, pl, ar){
		req = $.getJSON('http://ws.audioscrobbler.com/2.0/',{method:'track.getInfo', user: 'jonne7', format: 'json', api_key: 'b25b959554ed76058ac220b7b2e0a026', artist:ar, track:tr});

		req.complete(function(d){
			duration = $.parseJSON(d.responseText).track.duration * pl;
			totalPlayTime += duration;
			$('#total').html(totalPlayTime);
			window.graphData.push([tr, duration]);
			
			drawChart();
		});
	}
}