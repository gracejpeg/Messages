chrome.extension.sendMessage({}, function(response) {
	console.log("Running extension");
    
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            window.WebFont.load({
                google: {
                    families: ['Roboto Mono', 'UnifrakturMaguntia', 'Amiri', 'Yatra One']
                }
            });

            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log("Hello. This message was sent from scripts/inject.js");
            // ----------------------------------------------------------

            $('.fork-flag').first().text("LOOK AT THIS TEXT");
            console.log($('.fork-flag').first())

            var popup = $('<div class="popup show"></div>');

            /**var text = Math.random() > 0.5 ? "Text was greater than 0.5": "Text was lower than 0.5"
            popup.text(text)*/

            var text = $('<div class="fontBlackletter fontSans fontMono fontSerif font Display"><span class="fontBlackletter">sometimes </span><span class="fontSerif">I </span><span class="fontMono">left </span><span class="fontSans">messages </span><span class="fontSerif">in the </span><span class="fontDisplay">street.</span></div>');
            popup.append(text)
            $('body').append(popup);
            
            /*var image1 = new Image();
            image1.src = 
            popup.append(image1)
            $('body').append(popup);*/

        }
    }, 10);
});