// ==UserScript==
// @name        LSS show move personal
// @version     1.0
// @author      Crazycake
// @description How much personal is on the buildings you want to move from.
// @include     https://www.leitstellenspiel.de/buildings/*/hire
// @grant       none
// ==/UserScript==

(function () {
    'use strict';

    if (!localStorage.aBuildings || JSON.parse(localStorage.aBuildings).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)) {
        $.getJSON('/api/buildings').done(data => localStorage.setItem('aBuildings', JSON.stringify({ lastUpdate: new Date().getTime(), value: data })));
    }
    var aBuildings = JSON.parse(localStorage.aBuildings).value;

    let wachen = document.getElementsByClassName("panel-heading personal-select-heading");

    for (var wache of wachen) {
        var wacheID = wache.getAttribute("building_id");
        for (var i = 0; i < aBuildings.length; i++) {
            if (wacheID == aBuildings[i].id){
            var personal_count = aBuildings[i].personal_count;
            wache.textContent += " | Personal: " + personal_count;
            }
        }

    }

}());