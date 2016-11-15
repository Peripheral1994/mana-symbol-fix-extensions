chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		function getAll(xpath){
			return document.querySelectorAll(xpath);
		}

		function getBaseXPathErrorUrl(forSymbol){
			return "img[src='http://resources.wizards.com/magic/images/symbols/Symbol_" + forSymbol + "_mana.gif']";
		}

		function replaceWithCorrectUrl(elements, by){
			var baseFix = "http://magic.wizards.com/sites/all/modules/custom/wiz_autocard/wiz_manacost/manasymbols/";
			for(var e in elements){
				var el = elements.item(e); 
				if(el) el["src"] = baseFix + by + ".gif";
			}
		}

		function replaceWithNumberCorrectUrl(elements, by){
			var baseFix = "http://gatherer.wizards.com/Handlers/Image.ashx?size=small&name=";
			for(var e in elements){
				var el = elements.item(e); 
				if(el) el["src"] = baseFix + by + "&type=symbol";
			}
		}

		var blacks = getAll(getBaseXPathErrorUrl("B"));
		var reds = getAll(getBaseXPathErrorUrl("R"));
		var whites = getAll(getBaseXPathErrorUrl("W"));
		var greens = getAll(getBaseXPathErrorUrl("G"));
		var blues = getAll(getBaseXPathErrorUrl("U"));
		var taps = getAll(getBaseXPathErrorUrl("T"));

		replaceWithCorrectUrl(blacks, "black");
		replaceWithCorrectUrl(reds, "red");
		replaceWithCorrectUrl(whites, "white");
		replaceWithCorrectUrl(greens, "green");
		replaceWithCorrectUrl(blues, "blue");
		replaceWithCorrectUrl(taps, "tap");

		for(var i = 0;i<21;i++) {
			replaceWithNumberCorrectUrl(getAll(getBaseXPathErrorUrl(i)), i);
		}
	}
	}, 10);
});