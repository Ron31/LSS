// ==UserScript==
// @name         LSS Chat permanent whisper
// @version      0.2
// @description  Enables to whisper permanent in alliance chat.
// @author       Crazycake
// @include      /^https?:\/\/(?:w{3}\.)?(?:operacni-stredisko\.cz|alarmcentral-spil\.dk|leitstellenspiel\.de|missionchief\.gr|(?:missionchief-australia|missionchief|hatakeskuspeli|missionchief-japan|missionchief-korea|nodsentralspillet|meldkamerspel|operador193|jogo-operador112|jocdispecerat112|dispecerske-centrum|112-merkez|dyspetcher101-game)\.com|missionchief\.co\.uk|centro-de-mando\.es|centro-de-mando\.mx|operateur112\.fr|operatore112\.it|operatorratunkowy\.pl|dispetcher112\.ru|larmcentralen-spelet\.se)\/?$/
// @grant        none

// ==/UserScript==

(function() {
    'use strict';

    var chathead = document.getElementById("chat_panel_heading");
    chathead.insertAdjacentHTML('beforeend','<input type="checkbox" id="Whisper"><img src="https://img.icons8.com/ios/15/000000/whisper.png"/>');

    function ToggleWhisper()
    {
        var checkbox = document.getElementById("Whisper");

        while(checkbox.checked == true)
        {
            var chatinhalt = document.getElementById("alliance_chat_message").value;
            console.log(chatinhalt);

            if(!chatinhalt.includes("/w"))
            {
                var w = "/w ";
                var chatinhalt_old = chatinhalt;
                chatinhalt = w.concat(chatinhalt_old);
                console.log(chatinhalt);
                document.getElementById("alliance_chat_message").value = chatinhalt;
            }
            sleep(1000);
        }
    }
    var Listener = document.querySelector("#Whisper");
    if(Listener)
    {
        Listener.addEventListener("click",ToggleWhisper, false);
    } 
    function sleep(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

    
    })();