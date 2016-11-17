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
		
		//The key (for example, 'black' or 'red') should be the name of the <NAME>.gif we're trying to access.
		//The key's value (for example, 'B' or 'R') should be the value of the old image, like 'Symbol_B_mana.gif'
		var symbols = {
			black: "B",
			red: "R",
			white: "W",
			green: "G",
			blue: "U",
			tap: "T",
			x: "X"
		};
		
		for (var type in symbols){
			replaceWithCorrectUrl(getAll(getBaseXPathErrorUrl(symbols[type])), type);
		}

		for(var i = 0;i<21;i++) {
			replaceWithNumberCorrectUrl(getAll(getBaseXPathErrorUrl(i)), i);
		}
	}
	}, 10);
});
