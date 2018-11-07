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

            var images = {
                first: '<img src="imgur.com/grace-image"></img></div>',
                second: '<img src="imgur.com/grace-image"></img>',
            }

            var randomNumber = Math.floor(Math.random() * Math.floor(10));
            var randomImageKey = Object.keys(images)[randomNumber]; // "first", "second", etc.

            var sentences = {
                first: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay">' + images[randomImageKey] + '<span class="fontBlackletter">sometimes </span><span class="fontSerif">I </span><span class="fontMono">left </span><span class="fontSans">messages </span><span class="fontSerif">in the </span><span class="fontDisplay">street.</span></div>',
                second: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">I </span><span class="fontSans">have been </span><span class="fontMono">thinking </span><span class="fontDisplay">a lot </span><span class="fontSerif">about </span><span class="fontBlackletter">loneliness </span><span class="fontSerif">and about my </span><span class="fontSans">first year </span><span class="fontMono">here.</span></div>',
                third: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontDisplay">everything </span><span class="fontSerif">is </span><span class="fontSans">different now; </span><span class="fontSerif">I feel like this is </span><span class="fontMono">my first time </span><span class="fontSerif">in </span><span class="fontSans">this </span><span class="fontBlackletter">place.</span></div>',
                fourth: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">the </span><span class="fontMono">feeling </span><span class="fontSerif">of </span><span class="fontSans">newness </span><span class="fontSerif">is so </span><span class="fontBlackletter">heavy.</span></div>',
                fifth: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">my </span><span class="fontBlackletter">loneliness </span><span class="fontSerif">at 21 feels </span><span class="fontSans">more </span><span class="fontDisplay">self-imposed </span><span class="fontSans">than </span><span class="fontMono">it did </span><span class="fontSerif">at 18.</span></div>',
                sixth: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">my </span><span class="fontBlackletter">heart </span><span class="fontSerif">is </span><span class="fontSans">bruised </span><span class="fontSerif">in tiny, </span><span class="fontMono">imperceptible </span><span class="fontSerif">ways, but somehow there is </span><span class="fontSans">now </span><span class="fontSerif">a sense of </span><span class="fontBlackletter">okayness.</span></div>',
                seventh: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">my </span><span class="fontSans">loneliness </span><span class="fontSerif">at 18 was more </span><span class="fontBlackletter">drought </span><span class="fontSerif">than </span><span class="fontDisplay">flood, </span><span class="fontSerif">as </span><span class="fontMono">unremarkable </span><span class="fontSerif">as it was </span><span class="fontSans">unbearable.</span></div>',
                eighth: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">it had </span><span class="fontBlackletter">teeth. </span><span class="fontSerif">it had </span><span class="fontSans">a throat </span><span class="fontSerif">for </span><span class="fontDisplay">yelling but </span><span class="fontSerif">no </span><span class="fontSans">lungs </span><span class="fontSerif">for </span><span class="fontMono">breathing.</span></div>',
                ninth: '<div class="fontBlackletter fontSans fontMono fontSerif font Display"><span class="fontSerif">I </span><span class="fontSans">wore it on </span><span class="fontMono">my face </span><span class="fontSerif">and on my </span><span class="fontDisplay">sleeve </span><span class="fontSerif">in the </span><span class="fontBlackletter">hopes </span><span class="fontSans">that someone might </span><span class="fontMono">carry </span><span class="fontSerif">it </span><span class="fontBlackletter">for me </span></div>',
                tenth: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">or </span><span class="fontSans">at least </span><span class="fontMono">show me </span><span class="fontBlackletter">where </span><span class="fontSerif">to put </span><span class="fontDisplay">it down.</span></div>',
            }

            var randomNumber = Math.floor(Math.random() * Math.floor(10));
            var randomKey = Object.keys(sentences)[randomNumber]; // "first", "second", etc.

            var popup = $('<div class="popup show"></div>');
            var text = $(sentences[randomKey]);
            popup.append(text)
            $('body').append(popup);
            
            
            /*var image1 = new Image();
            image1.src = 
            popup.append(image1)
            $('body').append(popup);*/

        }
    }, 10);
});