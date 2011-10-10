var googlehistory = function () {
    return { init: function() {
      gBrowser.addEventListener("load", function(event){
        var doc = event.originalTarget;

        // is this an inner frame?
        if (doc.defaultView.frameElement) {
          return;
        }
        dump("Got here!");

        var loc = doc.defaultView.location.href;
	if(loc.substr(0,4) != "http")
		return;

        dump("And here!");

	var url = googlehistory.getUrlToSendQueryFor(loc).split("#")[0];
	var hash = googlehistory.awesomeHash(url);
	var query = "http://toolbarqueries.google.com/tbr?client=navclient-auto&ch=8" + hash + "&features=Rank&q=info:" + url;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", query, false);
	xhr.send();
      }, true);
    },
toHex8:function(b) {
	return (b < 16 ? "0": "") + b.toString(16)
},

hexEncodeU32:function(b) {
	var c = googlehistory.toHex8(b >>> 24);
	c += googlehistory.toHex8(b >>> 16 & 255);
	c += googlehistory.toHex8(b >>> 8 & 255);
	return c + googlehistory.toHex8(b & 255)
},

awesomeHash:function(b) {
	for (var c = 16909125, d = 0; d < b.length; d++) {
		var HASH_SEED_ = "Mining PageRank is AGAINST GOOGLE'S TERMS OF SERVICE. Yes, I'm talking to you, scammer.";
		c ^= HASH_SEED_.charCodeAt(d % HASH_SEED_.length) ^ b.charCodeAt(d);
		c = c >>> 23 | c << 9
	}
	return googlehistory.hexEncodeU32(c)
},

getUrlToSendQueryFor:function(b) {
    var c = b.match(/^https:\/\/[^\/]*[\/]?/i);
    if (c) return c[0];
    return b
},

}

}();
window.addEventListener("load", googlehistory.init, false);
