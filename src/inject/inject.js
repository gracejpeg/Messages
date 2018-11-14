chrome.extension.sendMessage({}, function(response) {
	console.log("Running extension");
    
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            // LOAD FONTS
            window.WebFont.load({
                google: {
                    families: ['Roboto Mono', 'Pirata One', 'Amiri', 'Yatra One']
                }
            });

            // MANIPULATE STATE
            // Don't worry too much about this, just know that Chrome is basically letting us save
            // a little piece of data at each URL, and we can read it when we navigate back.
            var historyIndex = numberIsOdd(history.length) ?
                ((history.length - 1) / 2) :
                (history.length / 2);

            // If we load the current URL and it already has that tiny bit of data, that means we have
            // already been here, and we must be navigating back, so don't add any more data
            // or it will break the navigation!
            if (!(history.state && history.state.popupIndex)) {
                history.pushState({ popupIndex: historyIndex }, 'historyIndex');
            }

            // We don't want to show the popup until the user has 10 items in their history
            // but since saving that little piece of data I mentioned above adds an item to the history
            // object, we actually want to wait until the length of the history is double what is should be,
            // so we should wait until a length of 20 is achieved.
            if (history.length < 20) return;

            // ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~
            // ////////////////////// WARNING //////////////////////////////
            // Anything below this comment will only run once we show the popup, which means
            // once the user has navigated enough and we are ready to have them navigate back
            // while showing them the popup
            // ////////////////////// WARNING //////////////////////////////
            // ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~

            // Get the little piece of data we saved, which is an index number we will use to select
            // which sentence to show, and eventually which image, too!
            var sentencesKey = history.state.popupIndex;

            // LOAD INJECTED IMAGES
            // These need to be defined in manifest.json
            // {
            //     "web_accesible_resources": ["images/Cross.svg", "images/YourNextImageHere.png"]   
            // }
            var imgURL = chrome.extension.getURL('images/Cross.svg');

            // DEFINE SENTENCES
            var sentences = {
                0: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontBlackletter">sometimes </span><span class="fontSerif">I </span><span class="fontMono">left </span><span class="fontSans">messages </span><span class="fontSerif">in the </span><span class="fontDisplay">street.</span></div>',
                1: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">I </span><span class="fontSans">have been </span><span class="fontMono">thinking </span><span class="fontDisplay">a lot </span><span class="fontSerif">about </span><span class="fontBlackletter">loneliness </span><span class="fontSerif">and about my </span><span class="fontSans">first year </span><span class="fontMono">here.</span></div>',
                2: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontDisplay">everything </span><span class="fontSerif">is </span><span class="fontSans">different now; </span><span class="fontSerif">I feel like this is </span><span class="fontMono">my first time </span><span class="fontSerif">in </span><span class="fontSans">this </span><span class="fontBlackletter">place.</span></div>',
                3: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">the </span><span class="fontMono">feeling </span><span class="fontSerif">of </span><span class="fontSans">newness </span><span class="fontSerif">is so </span><span class="fontBlackletter">heavy.</span></div>',
                4: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">my </span><span class="fontBlackletter">loneliness </span><span class="fontSerif">at 21 feels </span><span class="fontSans">more </span><span class="fontDisplay">self-imposed </span><span class="fontSans">than </span><span class="fontMono">it did </span><span class="fontSerif">at 18.</span></div>',
                5: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">my </span><span class="fontBlackletter">heart </span><span class="fontSerif">is </span><span class="fontSans">bruised </span><span class="fontSerif">in tiny, </span><span class="fontMono">imperceptible </span><span class="fontSerif">ways, but somehow there is </span><span class="fontSans">now </span><span class="fontSerif">a sense of </span><span class="fontBlackletter">okayness.</span></div>',
                6: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">my </span><span class="fontSans">loneliness </span><span class="fontSerif">at 18 was more </span><span class="fontBlackletter">drought </span><span class="fontSerif">than </span><span class="fontDisplay">flood, </span><span class="fontSerif">as </span><span class="fontMono">unremarkable </span><span class="fontSerif">as it was </span><span class="fontSans">unbearable.</span></div>',
                7: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">it had </span><span class="fontBlackletter">teeth. </span><span class="fontSerif">it had </span><span class="fontSans">a throat </span><span class="fontSerif">for </span><span class="fontDisplay">yelling but </span><span class="fontSerif">no </span><span class="fontSans">lungs </span><span class="fontSerif">for </span><span class="fontMono">breathing.</span></div>',
                8: '<div class="fontBlackletter fontSans fontMono fontSerif font Display"><span class="fontSerif">I </span><span class="fontSans">wore it on </span><span class="fontMono">my face </span><span class="fontSerif">and on my </span><span class="fontDisplay">sleeve </span><span class="fontSerif">in the </span><span class="fontBlackletter">hopes </span><span class="fontSans">that someone might </span><span class="fontMono">carry </span><span class="fontSerif">it </span><span class="fontBlackletter">for me </span></div>',
                9: '<div class="fontBlackletter fontSans fontMono fontSerif fontDisplay"><span class="fontSerif">or </span><span class="fontSans">at least </span><span class="fontMono">show me </span><span class="fontBlackletter">where </span><span class="fontSerif">to put </span><span class="fontDisplay">it down.</span></div>',
            };

            // BUILD VARIOUS ELEMENTS
            var popup = $('<div class="popup show centerBox" id="x"></div>');
            var closeImage = $('<img class="closeButton" src="' + imgURL + '" />')
            var text = $(sentences[sentencesKey]);
            var backLink = $('<button class="back-link">view next message</button>')
            
            // ADD ELEMENTS TO POPUP
            popup.append(closeImage);
            popup.append(text);
            popup.append(backLink);
            $('body').append(popup);
            
            // ATTACH EVENT HANDLERS
            closeImage.click(function() { popup.remove() })
            backLink.click(goBack)
            
            // DEFINE EVENT HANDLERS
            function goBack(){
                window.history.go(-2);
            }

            // Does exactly what it says
            function numberIsOdd(number) {
                return !!(number % 2);
            }
        }
    }, 10);
});