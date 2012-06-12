// Code to post & Manage modal dialogs using jQuery
// Taken from:
// http://www.sohtanaka.com/web-design/inline-modal-window-w-css-and-jquery/
//
$(document).ready(function() {
// When you click on a link with class of poplight and the href starts with a # 
$('a.poplight[href^=#]').click(function() {
    var popID = $(this).attr('rel'); //Get Popup Name
    var popURL = $(this).attr('href'); //Get Popup href to define size

    // Pull Query & Variables from href URL
    var query= popURL.split('?');
    var dim= query[1].split('&');
    var popWidth = dim[0].split('=')[1]; //Gets the first query string value
    return popup.Post(popID,popWidth);
});

// -- handle special a tags
$('a.popup').click(function() {
    var popID = $(this).attr('target'); //Get Popup Name
    var popURL = $(this).attr('href');  //Get Popup href to define size
    return popup.PostPage(popID,popURL);
});

// Close Popups and Fade Layer
// When clicking on the close or fade layer...
$('a.close, #fade').live('click', function() {
    $('#fade , .popupBlock').fadeOut(function() {
        $('#fade, a.close').remove();  //fade them both out
    });
    onUnpop()
    return false;
});

// ---------------------------------------------------------- document ready
});

popup = {}
popup.Post = function(popID,popWidth) {
    if (popWidth==null) {
	popupWidth= $('#' + popID).width() + 10;
    }
    // Fade in the Popup and add close button
    $('#' + popID).fadeIn().css({ 'width': Number( popWidth ) }).prepend(
	'<a href="#" class="close">' +
	'<img src="popupClose.png" class="buttonClose"' + 
	'title="Close Window" alt="Close" /></a>');

    // Define margin for center alignment (vertical   horizontal)
    // we add 80px to the height/width to accomodate for the padding 
    // and border width defined in the css
    var popMargTop = ($('#' + popID).height() + 10) / 2;
    var popMargLeft = ($('#' + popID).width() + 10) / 2;

    //Apply Margin to Popup
    $('#' + popID).css({
        'margin-top' : -popMargTop,
        'margin-left' : -popMargLeft
    });

    // Fade in Background
    // Add the fade layer to bottom of the body tag.
    $('body').append('<div id="fade"></div>');
    // Fade in the fade layer - .css({'filter' : 'alpha(opacity=80)'})
    // is used to fix the IE Bug on fading transparencies 
    $('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();

    return false;
}

// post a dynamically loaded page on a given popup
// NOTE: the popup should contain an iframe named popID.iframe
popup.PostPage = function(popID,url,popWidth) {
    popup.Post(popID,popWidth)
    var iframe=popID+'.iframe'
    var element = document.getElementById(iframe)
    if (element == null) {
	throw('"' + iframe + '": iframe element id not found');
    }
    element.src = url;
    return false;
}

// post an html string to a popup
// NOTE: the popup should contain an iframe named popID.iframe
popup.PostHTMLString = function(popID,htmlString,popWidth) {
    popup.Post(popID,popWidth)
    var iframe=popID + '.content'
    var element = document.getElementById(iframe)
    element.innerHTML = htmlString
    return false;
}

// unpost a popup
popup.Unpost = function() {
    $('#fade , .popupBlock').fadeOut(100,function() {
        $('#fade, a.close').remove();  //fade them both out
    });
}
