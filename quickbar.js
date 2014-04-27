// ==UserScript==
// @name        TribalWars-quickbar
// @namespace   http://example.net
// @include     *.plemiona.pl/game.php?*
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @require     http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js
// @resource    jquitheme http://code.jquery.com/ui/1.8.24/themes/black-tie/jquery-ui.css
// @resource    qbar https://raw.githubusercontent.com/majk-p/Tribal-Wars-scripts/master/static/quickbar.html
// @resource    settings https://raw.githubusercontent.com/majk-p/Tribal-Wars-scripts/master/static/settings.html
// @version     1
// @grant       GM_getResourceText
// @grant       GM_addStyle
// ==/UserScript==
function gup(name) {
    name = name.replace(/[\[]/, '\[') .replace(/[\]]/, '\]');
    var regexS = '[\?&]' + name + '=([^&#]*)';
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
    return '';
     else
    return results[1];
}
$(function () {
    console.log("starting");
    GM_addStyle(GM_getResourceText('jquitheme'));
    $('.maincell') .prepend(GM_getResourceText('qbar') .split('VILID') .join(gup('village')));
    $("body").append(GM_getResourceText('settings'));
    

    $("a[rel=#settings]").overlay({mask: '#000'});
    
    //hiding tab content except first one
    $("#tabs div.tab_content").not(":first").hide();
    // adding Active class to first selected tab and show
    $("#tabs ul li:first").addClass("active").show(); 
 
    // Click event on tab
    $("#tabs ul li").click(function() {
        // Removing class of Active tab
        $("#tabs ul li.active").removeClass("active");
        // Adding Active class to Clicked tab
        $(this).addClass("active");
        // hiding all the tab contents
        $("#tabs div.tab_content").hide();       
        // showing the clicked tab's content using fading effect
        $($('a',this).attr("href")).fadeIn('slow');
 
        return false;
    });

    console.log("done");
});
