// ==UserScript==
// @name        LSS Mission in area check
// @version     1.1.0
// @description Checks whether a mission is inside a polygon.
// @author      Crazycake
// @include     /https:\/\/www.leitstellenspiel.de/
// @include     /https:\/\/www.leitstellenspiel.de/missions/\d+/
// @grant       none
// @run-at document-end
// ==/UserScript==

(function () {
    'use strict';

    //config
    var useOwnCoordinates = false;
    var borderCoordinates = [];

    if(borderCoordinates.length > 0)
    {
        setLS(borderCoordinates);
    }
    else if(borderCoordinates.length = 0 && JSON.parse(localStorage.getItem('LSS_mission_in_area_check')) !== 'undefined' && JSON.parse(localStorage.getItem('LSS_mission_in_area_check')) !== null ){
        borderCoordinates = getLS();
    }

    var url = window.location.pathname;
    if (window.top == window.self && !useOwnCoordinates) {
        var configBtn = '<button type="button" id="stateBtn" style="backgroundcolor:white;color:black dispaly:none" class="leaflet-bar leaflet-control leaflet-control-custom" data-toggle="collapse" title="Bundeslandauswahl"><span class="glyphicon glyphicon-cog"></span></button><div id="stateInput" class="leaflet-bar leaflet-control leaflet-control-custom" style="display:none; background:white; position: relative; role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><label for="stateSelect">Bundeslandauswahl: </label><br><input id="stateSelect" list="stateList"><datalist id="stateList"></datalist></input></div></div>';
        var mapDownLeft = document.getElementsByClassName("leaflet-bottom leaflet-left");
        var mapDownLeftArr = [...mapDownLeft];
        mapDownLeftArr[0].innerHTML = configBtn;
        document.getElementById("stateBtn").addEventListener("click", toggleVisability);
        document.getElementById("close").addEventListener("click", toggleVisability);

        function toggleVisability() {
            var stateInput = document.getElementById("stateInput");
            var stateBtn = document.getElementById("stateBtn");
            if (stateInput.style.display === "none") {
                stateInput.style.display = "block";
            } else {
                stateInput.style.display = "none";
            }
            if (stateBtn.style.display === "none") {
                stateBtn.style.display = "block";
            } else {
                stateBtn.style.display = "none";
            }
        };
        $.getJSON('https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/master/2_bundeslaender/4_niedrig.geo.json', function (data) {
            var states = [];
            states = data.features;
            for (var i = 0; i < states.length; i++) {
                var option = document.createElement('option');
                option.value = states[i].properties.name;
                option.innerHTML = states[i].properties.name;
                document.getElementById("stateList").appendChild(option);
            }
            document.getElementById("stateSelect").addEventListener("focusout", function () {
                document.getElementById("stateSelect").value;
                switch (document.getElementById("stateSelect").value) {

                    case "Baden-Württemberg": window.top.borderCoordinates = states[0].geometry.coordinates[0]; break;
                    case "Bayern": window.top.borderCoordinates = states[1].geometry.coordinates[0]; break;
                    case "Berlin": window.top.borderCoordinates = states[2].geometry.coordinates[0]; break;
                    case "Brandenburg": window.top.borderCoordinates = states[3].geometry.coordinates[0]; break;
                    case "Bremen": window.top.borderCoordinates = states[4].geometry.coordinates[0]; break;
                    case "Hamburg": window.top.borderCoordinates = states[5].geometry.coordinates[0]; break;
                    case "Hessen": window.top.borderCoordinates = states[6].geometry.coordinates[0]; break;
                    case "Mecklenburg-Vorpommern": window.top.borderCoordinates = states[7].geometry.coordinates[0]; break;
                    case "Niedersachsen": window.top.borderCoordinates = states[8].geometry.coordinates[0]; break;
                    case "Nordrhein-Westfalen": window.top.borderCoordinates = states[9].geometry.coordinates[0]; break;
                    case "Rheinland-Pfalz": window.top.borderCoordinates = states[10].geometry.coordinates[0]; break;
                    case "Saarland": window.top.borderCoordinates = states[11].geometry.coordinates[0]; break;
                    case "Sachsen-Anhalt": window.top.borderCoordinates = states[12].geometry.coordinates[0]; break;
                    case "Sachsen": window.top.borderCoordinates = states[13].geometry.coordinates[0]; break;
                    case "Schleswig-Holstein": window.top.borderCoordinates = states[14].geometry.coordinates[0]; break;
                    case "Thüringen": window.top.borderCoordinates = states[15].geometry.coordinates[0]; break;
                    default: break;
                }
                setLS(window.top.borderCoordinates);
            });
        });


    }
    if (url.includes("mission")) {
        var missionId = url.split("/")[2];
        var missionUrl = window.top.document.getElementById("mission_caption_" + missionId);
        var missionLatitude = missionUrl.getAttribute("data-latitude");
        var missionLongitude = missionUrl.getAttribute("data-longitude");
        window.top.borderCoordinates = getLS();
        var missionCoordinates = [missionLongitude, missionLatitude];
        if(window.top.borderCoordinates == null && !useOwnCoordinates){
            alert("Keine Grenze angegeben! Alle Einsätze werden außerhalb des Gebiets deklariert!");
            window.top.borderCoordinates = [[0, 0], [0, 0]];
        }
        var missionIsInPolygon = inside(missionCoordinates, window.top.borderCoordinates);
        if (!missionIsInPolygon) {
            var shareBtn = document.getElementById("mission_alliance_share_btn");
            shareBtn.classList.add("btn-warning");
            shareBtn.classList.remove("btn-success")
            var shareAlarmForwardBtn = document.getElementsByClassName("alert_next_alliance");
            for (var i = 0; i < shareAlarmForwardBtn.length; i++) {
                shareAlarmForwardBtn[i].classList.add("btn-warning");
                shareAlarmForwardBtn[i].classList.remove("btn-success");

            }
            var shareAllianceBtn = document.getElementsByClassName("alert_notify_alliance");
            for(var j = 0; j < shareAllianceBtn.length; j++){
                shareAllianceBtn[j].classList.add("btn-warning");
                shareAllianceBtn[j].classList.remove("btn-success");
        }
        console.log(shareAllianceBtn);

        }

    }


    function inside(point, vs) {
        // ray-casting algorithm based on
        // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

        var x = point[0], y = point[1];

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };


    function getLS() {
    return JSON.parse(localStorage.getItem('LSS_mission_in_area_check'));
    };

    function setLS(value) {
        localStorage.setItem('LSS_mission_in_area_check', JSON.stringify(value));
    }

})();