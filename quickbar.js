// ==UserScript==
// @name        TribalWars-quickbar
// @namespace   http://example.net
// @include     *.plemiona.pl/game.php?*
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @resource    qbar https://raw.githubusercontent.com/majk-p/Tribal-Wars-scripts/master/static/quickbar.html
// @version     1
// @grant       GM_getResourceText
// ==/UserScript==
function gup( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}


$(function(){
    $(".maincell").prepend(GM_getResourceText("qbar").split("VILID").join(gup("village")));
    console.log("done");
});
