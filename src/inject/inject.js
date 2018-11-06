chrome.extension.sendMessage({}, function(response) {
	console.log("Running extension");

	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		$('.fork-flag').first().text("LOOK AT THIS TEXT");
		console.log($('.fork-flag').first())

		var popup = $('<div class="popup show"></div>');
        
        /**var text = Math.random() > 0.5 ? "Text was greater than 0.5": "Text was lower than 0.5"
        popup.text(text)*/
        
        var text = $('<div class="font1 font2 font3"><span class="font3">Sometimes </span><span class="font2">I </span><span class="font1">left messages in the street.</span></div>');
        popup.append(text)
		$('body').append(popup);
        
	}
	}, 10);
});