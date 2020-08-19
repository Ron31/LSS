// ==UserScript==
// @name        LSS Chat permanent whisper
// @version     1.5
// @description Enables permanent whisper in alliance chat.
// @author      Crazycake
// @include     /^https?:\/\/(?:w{3}\.)?(?:operacni-stredisko\.cz|alarmcentral-spil\.dk|leitstellenspiel\.de|missionchief\.gr|(?:missionchief-australia|missionchief|hatakeskuspeli|missionchief-japan|missionchief-korea|nodsentralspillet|meldkamerspel|operador193|jogo-operador112|jocdispecerat112|dispecerske-centrum|112-merkez|dyspetcher101-game)\.com|missionchief\.co\.uk|centro-de-mando\.es|centro-de-mando\.mx|operateur112\.fr|operatore112\.it|operatorratunkowy\.pl|dispetcher112\.ru|larmcentralen-spelet\.se)\/?$/
// @grant       none
// @updateURL   https://github.com/Cr4zyc4k3/LSS/raw/master/LSS_Permanent_Whisper.user.js
// ==/UserScript==

(function() {
    'use strict';

    //Config
    var showOnlyOnlineUsers = false;

    var chathead = document.getElementById("chat_panel_heading");
    chathead.insertAdjacentHTML('beforebegin',
    '<div id="WhisperDiv" class="pull-right panel-heading"> Permanent whisper to <input id="whisperUser" list="whisperUserList" style="color:black"><datalist id="whisperUserList"></datalist> <input type="checkbox" id="Whisper"></div>');
   

    var allianceinfo = {};
    var whisperUserList = document.getElementById("whisperUserList");
    $.getJSON('/api/allianceinfo', function(data){
    allianceinfo = data;
    var allianceUsers = [];
    for(var i = 0; i < allianceinfo.users.length ; i++)
    {
        if(showOnlyOnlineUsers)
        {
            if(allianceinfo.users[i].online)
            {
                allianceUsers.push(allianceinfo.users[i].name);
            }
        }
        else
        {
            allianceUsers.push(allianceinfo.users[i].name);
        }
    }
    allianceUsers.forEach(function(item){
        var option = document.createElement('option');
        option.value = item;
        whisperUserList.appendChild(option);
    })
    });


    function ToggleWhisper()
    {
        var checkbox = document.getElementById("Whisper");
        var chatinhalt = document.getElementById("alliance_chat_message").value;
        var whisperUser = document.getElementById("whisperUser").value;

        if(checkbox.checked == true)
        {
            if(!chatinhalt.includes("/w"))
            {
                var w = "/w " + whisperUser + " ";
                var chatinhalt_old = chatinhalt;
                chatinhalt = w.concat(chatinhalt_old);
                document.getElementById("alliance_chat_message").value = chatinhalt;
            }
        }
        else
        {
            document.getElementById("alliance_chat_message").value = chatinhalt.replace("/w ","").replace(whisperUser + " ", "");
        }
    }

    var ToggleListener = document.querySelector("#Whisper");
    if(ToggleListener)
    {
        ToggleListener.addEventListener("click",ToggleWhisper);
    }
    var ReloadListener = document.querySelector("#new_alliance_chat");
    if(ReloadListener)
    {
        ReloadListener.addEventListener("submit", ToggleWhisper);
    }
})();