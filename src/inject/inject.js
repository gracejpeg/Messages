chrome.extension.sendMessage({}, function(response) {
	console.log("Running extension");
    
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {

            console.log('Injection executed');
            clearInterval(readyStateCheckInterval);

            // Load in our Google Fonts
            window.WebFont.load({
                google: {
                    families: ['Roboto Mono', 'UnifrakturMaguntia', 'Amiri', 'Yatra One']
                }
            });

            var images = {
                first: '<img src="imgur.com/grace-image"></img></div>',
                second: '<img src="imgur.com/grace-image"></img>',
            }

            var randomNumber = Math.floor(Math.random() * Math.floor(2));
            var randomImageKey = Object.keys(images)[randomNumber]; // "first", "second", etc.

            var sentences = {
                first: '<div class="fontBlackletter fontSans fontMono fontSerif font Display">' + images[randomImageKey] + '<span class="fontBlackletter">sometimes </span><span class="fontSerif">I </span><span class="fontMono">left </span><span class="fontSans">messages </span><span class="fontSerif">in the </span><span class="fontDisplay">street.</span></div>',
                second: '<div class="fontBlackletter fontSans fontMono fontSerif font Display"><span class="fontBlackletter">sometimes </span><span class="fontSerif">I </span><span class="fontMono">left </span><span class="fontSans">messages </span><span class="fontSerif">in the </span><span class="fontDisplay">butt.</span></div>',
                third: '<div class="fontBlackletter fontSans fontMono fontSerif font Display"><span class="fontBlackletter">sometimes </span><span class="fontSerif">I </span><span class="fontMono">left </span><span class="fontSans">messages </span><span class="fontSerif">in the </span><span class="fontDisplay">moon.</span></div>',
                fourth: '<div class="fontBlackletter fontSans fontMono fontSerif font Display"><span class="fontBlackletter">sometimes </span><span class="fontSerif">I </span><span class="fontMono">left </span><span class="fontSans">messages </span><span class="fontSerif">in the </span><span class="fontDisplay">Boston.</span></div>',
            }

            var randomNumber = Math.floor(Math.random() * Math.floor(4));
            var randomKey = Object.keys(sentences)[randomNumber]; // "first", "second", etc.

            var popup = $('<div class="popup show"></div>');
            var text = $(sentences[randomKey]);

            popup.append(text)
            $('body').append(popup);
            
        }
    }, 10);
});