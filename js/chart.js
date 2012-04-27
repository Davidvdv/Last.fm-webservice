google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart(username, data) {
	var data = google.visualization.arrayToDataTable([
		['Track', 'Duration'],
		['Hello',  1000],
		['Song1',  1170],
		['Song2',  660],
		['Girl',  1030]
	]);

	var options = {
		title: username,
		hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
	chart.draw(data, options);
}