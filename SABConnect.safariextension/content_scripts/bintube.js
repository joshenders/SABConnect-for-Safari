/**********************************************************/
//Check if we are on bintube.com
var loc_bintube;

if (location.href.indexOf("bintube.com") == -1) {
    loc_bintube = 0;
}
else {
    loc_bintube = 1;
}
/**********************************************************/

function addToSABnzbdFromBintube() {
    // Set the image to an in-progress image
    var img = safari.extension.baseURI + 'images/sab2_16_fetching.png';
    $(this).find('img').attr("src", img);
    
    var nzburl = $(this).attr('href');
    var addLink = this;
    	
    //Construct message to send to background page
    var message = addLink + " " + nzburl + " " + "addurl";
    safari.self.tab.dispatchMessage("addToSABnzbd", message);
    
    return false;
}

//Don't modify page if we aren't on bintube.com
if (loc_bintube) {
	$('a.dlbtn').each(function() {
		var href = $(this).attr('href');
		var img = chrome.extension.getURL('/images/sab2_16.png');
		var link = '<a class="addSABnzbd" href="' + href + '"><img src="' + img + '" /></a> ';
		$(this).before(link);
		$(this).remove();
	});

	// Change the on click handler to send to sabnzbd
	// moved because the way it was the click was firing multiple times
	$('.addSABnzbd').each(function() {
		$(this).click(addToSABnzbdFromBintube);
	});	
}