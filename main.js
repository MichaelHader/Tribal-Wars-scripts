// ==UserScript==
// @name        TribalWarsFarmingScript 
// @namespace   https://github.com/majk-p/Tribal-Wars-scripts
// @description add shortcuts 
// @include     http://*.plemiona.*/game.php?village=*&screen=place
// @require     http://github.com/andris9/jStorage/raw/master/jstorage.js
// @version     1.1
// @grant       none
// @author      http://michalp.net
// ==/UserScript==
$('#menu_row') .append("<td class='menu-item' id='farma'><a href='#'><span> <img alt='Farmienie' src='http://cdn.plemiona.pl/8.20/20029/graphic/command/attack.png'>Farmienie</span></a></td>");

if (!$.jStorage.get('init') || JSON.parse($.jStorage.get('cords')) .length >= $.jStorage.get('iterator')) {
    // initialize cords
	var cord = [
		'123|123',
		'456|456'
    ];
    $.jStorage.set('cords', JSON.stringify(cord));
    // set defaults
    $.jStorage.set('lightCount', 10);
    $.jStorage.set('spyCount', 1);
    // finish initialization
    $.jStorage.set('init', 1);
    $.jStorage.set('iterator', 0);
}
$('#farma') .click(function (e) {
    e.preventDefault();
    $('#unit_input_light') .val($.jStorage.get('lightCount'));
    $('#unit_input_spy') .val($.jStorage.get('spyCount'));
    $('.target-input-field') .val(JSON.parse($.jStorage.get('cords')) [$.jStorage.get('iterator')]
    );
    $.jStorage.set('iterator', parseInt($.jStorage.get('iterator')) + 1);
});
