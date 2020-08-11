// ==UserScript==
// @name         LSS Chat permanent whisper
// @version      0.1
// @description  Enables to whisper permanent in alliance chat.
// @author       Crazycake
// @include      /^https?:\/\/(?:w{3}\.)?(?:operacni-stredisko\.cz|alarmcentral-spil\.dk|leitstellenspiel\.de|missionchief\.gr|(?:missionchief-australia|missionchief|hatakeskuspeli|missionchief-japan|missionchief-korea|nodsentralspillet|meldkamerspel|operador193|jogo-operador112|jocdispecerat112|dispecerske-centrum|112-merkez|dyspetcher101-game)\.com|missionchief\.co\.uk|centro-de-mando\.es|centro-de-mando\.mx|operateur112\.fr|operatore112\.it|operatorratunkowy\.pl|dispetcher112\.ru|larmcentralen-spelet\.se)\/?$/
// @grant        none

// ==/UserScript==

(function() {
    'use strict';    
    
    var chathead = document.getElementById("chat_panel_heading");
    chathead.insertAdjacentHTML('beforeend','<input type="checkbox" id="Whisper"> Dauerhaftes Flüstern');
    


})();