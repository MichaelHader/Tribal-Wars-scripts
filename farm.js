// ==UserScript==
// @name TribalWarsFarmingScript
// @namespace https://github.com/majk-p/Tribal-Wars-scripts
// @description add shortcuts
// @include http://*.plemiona.*/game.php?village=*&screen=place
// @require http://github.com/andris9/jStorage/raw/master/jstorage.js
// @version 1.2
// @grant none
// @author http://michalp.net
// ==/UserScript==

function ucFirst(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
}

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

var cord = JSON.parse($.jStorage.get("cords"));

function waitForQuickbar(){
    if(! $('#quickbar_inner').length){
        window.setTimeout(waitForQuickbar, 50);
    }else{
        main();
    }
}

function main(){
    //$.jStorage.set('init',0);
    $('#quickbar_inner') .find('tr:eq(1) ul') .append("<li id='farma'><a href='#'><span> <img alt='Farmienie' src='http://cdn.plemiona.pl/8.20/20029/graphic/command/attack.png'>Farmienie</span></a></li>");    
    if (!$.jStorage.get('init') || JSON.parse($.jStorage.get('cords')) .length == $.jStorage.get('iterator')) {
        console.log("init");
        $.jStorage.set('cords', JSON.stringify(cord));
        // set defaults
        $.jStorage.set('farmingActive', 0);
        // finish initialization
        $.jStorage.set('init', 1);
        $.jStorage.set('iterator', 0);
    }
    $('li#farma') .click(function (e) {
        e.preventDefault();
        $.jStorage.set('farmingActive', !$.jStorage.get('farmingActive'));
        $(this).toggleClass("active", $.jStorage.get('farmingActive'));
    });
    if($.jStorage.get('farmingActive')){
        $('li#farma').toggleClass("active", 1);
        
        $("#units_form .unitsInput").each(function(){
            var arr = $(this).attr("id").split("_");
            $(this).val($.jStorage.get("farm"+ucFirst(arr[arr.length-1])));
        });
        
        $('.target-input-field').val(JSON.parse($.jStorage.get('cords')) [$.jStorage.get('iterator')]);
        $("#content_value h3").append(" ["+$.jStorage.get('iterator')+"/"+JSON.parse($.jStorage.get('cords')).length+"]");
        if(gup("try") != "confirm") $.jStorage.set('iterator', parseInt($.jStorage.get('iterator')) + 1);
    }
}

waitForQuickbar();
