// ==UserScript==
// @name         LSS Chat permanent whisper
// @version      0.1
// @description  Enables to whisper permanent in alliance chat.
// @author       Crazycake
// @match        https://leitstellenspiel.de
// @grant        none
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById('chat_panel_heading-id').innerHTML = '<button type="button"><img src="https://img.icons8.com/ios-filled/50/000000/whispering.png"/></button>';
    

    //var chatwindow = document.getElementbyId("alliance_chat_message");
    //chatwindow.value("/w");
})();