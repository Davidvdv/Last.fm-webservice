google.load("visualization", "1", {packages:["corechart"]});

function drawChart(data, username){
	
	var data = google.visualization.arrayToDataTable(data);	
	var options = {
		title: username,
		hAxis: {title: 'Tracks', titleTextStyle: {color: 'black'}},
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
	chart.draw(data, options);
}