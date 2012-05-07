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
	
	/* Fire first API call
	* This call will return all the tracks the given user listened to in the last week.
	* We're feeding the parameters through jQuery so they will be escaped properly
	*/
	$.getJSON('http://ws.audioscrobbler.com/2.0/',{method:'user.getweeklytrackchart', user:this.username, format:'json', api_key:'b25b959554ed76058ac220b7b2e0a026'}, function(data){
		
		/* The Last.fm API will return an error code in JSON-format when something goes wrong.
		* So if this error is undefined, everything went as expected. If something goes wrong
		* we will notify the user and ask him whether he likes to try again or just stare at a blank page
		*/
		
		if(data.error == undefined){
			
			// Yay. Everything went allright. Now: iterate over each track...
			for(i in data.weeklytrackchart.track)
			{	
				// ...and save the needed details such as name, playcount and artist
				tr = data.weeklytrackchart.track[i].name;
				pl = data.weeklytrackchart.track[i].playcount;
				ar = data.weeklytrackchart.track[i].artist["#text"];
				
				// Finally feed the fetched data into the processor
				app.process(tr, pl, ar);
			}
		}
		else{
			// Lets ask some questions
			if(confirm('Last.fm user is not found. Would you like to retry?')){
				// Ahh, how cute. He likes to try again
				window.location.reload(true); // <- nasty method ;)
			}
			else{
				// Are you serious?
				alert('Ah well. Have fun staring at a blank page then ;)');
			}
		}
		
	});
}

/* Process method
 * @desc This method will process the individual tracks by
 * fetching their length, multiplying their length with the playcount and send it to the graph
*/	
Engine.prototype.process = function(tr, pl, ar){
	// Save a reference to the this-object
	app = this; 

	// create a net request object
	req = $.getJSON('http://ws.audioscrobbler.com/2.0/',{method:'track.getInfo', format: 'json', api_key: 'b25b959554ed76058ac220b7b2e0a026', artist:ar, track:tr});

	// If the request completes
	req.complete(function(d){
		// Fetch the duration of the
		duration = $.parseJSON(d.responseText).track.duration * pl;
		
		// Input: miliseconds. Output: Minutes.. Boom. Like magic!
		duration = Math.ceil((duration / 1000) /60);
		
		// Add the total duration of this individual song to the total
		app.totalPlayTime += duration;
		
		// Write the total playtime to screen so the user has something to enjoy
		$('#total').html(app.totalPlayTime + "min.");
		
		// And for the graph; push a new graph-entry into the array
		app.graphData.push([tr, duration]);
		
		// Redraw the chart
		drawChart(app.graphData, app.username);
	});
}
