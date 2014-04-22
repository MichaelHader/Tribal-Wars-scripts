// ==UserScript==
// @name        Tribal Wars auto attacker
// @namespace   
// @description Auto attacker
// @include     http://pl*.plemiona.pl/game.php?village=*&screen=place
// @version     1
// @require     http://github.com/andris9/jStorage/raw/master/jstorage.js
// @grant       none
// ==/UserScript==
$('#quickbar_inner') .find('tr:eq(1) ul') .append("<li id='farma'><a href='#'><span> <img alt='Farmienie' src='http://cdn.plemiona.pl/8.20/20029/graphic/command/attack.png'>Farmienie</span></a></li>");

if (!$.jStorage.get('init') || JSON.parse($.jStorage.get('cords')) .length == $.jStorage.get('iterator')) {
    // initialize cords
    var cord = [
        '123|456',
        '654|987'
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

