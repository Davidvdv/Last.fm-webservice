/* 
*	Engine Class
*	@desc This class is used to fetch all the userdata from the Last.fm-API
*	@param usr (Last.fm username; used to feth all the data)
*/
function Engine(usr){
	// Initialize and set username based on parameter
	this.username = usr;
	
	// Initialize and set totalPlayTime to zero
	this.totalPlayTime = 0;	
	
	// Create an empty array for storing the chart-information
	this.graphData = new Array();
	
	// Push first row into chart-array which is used to display the titles
	this.graphData.push(['Track', 'Duration']);
	
	// Run the application
	this.initialize();
}

/* Initialize method
 * @desc This request will fetch all the tracks the user listened to last week
 * the API will return JSON containing all the tracks including trackname, artist and playcount
*/
Engine.prototype.initialize = function(){
	// Save reference to the this object
	app = this;
	
	// Hide the form
	$("#first").hide();
	
	// Show the graph
	$("#second").show();
	
	// Fire first request
	$.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user='+this.username+'&format=json&api_key=b25b959554ed76058ac220b7b2e0a026', function(data){
		
		for(i in data.weeklytrackchart.track)
		{	
			tr = data.weeklytrackchart.track[i].name;
			pl = data.weeklytrackchart.track[i].playcount;
			ar = data.weeklytrackchart.track[i].artist["#text"];
			
			app.process(tr, pl, ar);
		}
		
	});
}
	
Engine.prototype.process = function(tr, pl, ar){
	//
	app = this; 
	req = $.getJSON('http://ws.audioscrobbler.com/2.0/',{method:'track.getInfo', format: 'json', api_key: 'b25b959554ed76058ac220b7b2e0a026', artist:ar, track:tr});
	
	req.complete(function(d){
		
			duration = $.parseJSON(d.responseText).track.duration * pl;
			duration = ((duration / 1000) /60);
			app.totalPlayTime += duration;
			$('#total').html(app.totalPlayTime);
			app.graphData.push([tr, duration]);
			drawChart(app.graphData, app.username);
		});
}
