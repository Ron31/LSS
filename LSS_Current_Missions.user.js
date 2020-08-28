// ==UserScript==
// @name         LSS current mission
// @version      0.1
// @author       Crazycake
// @match        https://www.leitstellenspiel.de/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Einsätze: " + document.getElementById("mission_select_emergency").innerText);
    console.log("Krankentransporte: " + document.getElementById("mission_select_krankentransport").innerText);
    console.log("Verbandseinsätze: " + document.getElementById("mission_select_alliance").innerText);
    console.log("Eventeinsätze: " + document.getElementById("mission_select_alliance_event").innerText);
    console.log("Sicherheitswachen: " + document.getElementById("mission_select_sicherheitswache").innerText);

})();