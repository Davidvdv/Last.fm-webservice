// Wait until the DOM has loaded
$(document).ready(function(){
	
	// Set focus to the input field by default
	$("#username").focus();
	
	// When the user clicks the button
	$('#go').click(function(){
		// Initialize and runn the app with the given username
		window.app = new Engine($('#username').val());
	});
	
	// When the user presses a button inside the username-field
	$('#username').keyup(function(e){
		// and it appears to be the return key
		if(e.keyCode == 13){
			// Run the application with the given username
			window.app = new Engine($('#username').val());
		}
	});
	
});