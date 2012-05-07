// Wait until the DOM has loaded
$(document).ready(function(){
	
	// Set focus to the input field by default
	$("#username").focus();
	
	// When the user submits the form
	$('#form').submit(function(){
		window.app = new Engine($('#username').val());
		return false;
	});
	
});