// ==UserScript==
// @name        LSS Mission in area check
// @version     1.1.0
// @description Checks whether a mission is inside a polygon.
// @author      Crazycake
// @include     /https:\/\/www.leitstellenspiel.de/
// @include     /https:\/\/www.leitstellenspiel.de/missions/\d+/
// @grant       none
// ==/UserScript==

(function () {
    'use strict';

    //config
    var useOwnCoordinates = false;
    var borderCoordinates = [[6.077742099761963, 50.90677642822277], [6.139449119567871, 50.901950836181641], [6.149639129638672, 50.932571411132812], [6.197109222412053, 50.953559875488281], [6.228148937225455, 50.943500518798942], [6.229781150817985, 50.920940399169979], [6.201058864593563, 50.897159576415959], [6.220118999481201, 50.886661529541129], [6.228139877319393, 50.860610961914176], [6.298820018768311, 50.885829925537166], [6.32427978515625, 50.867900848388729], [6.313479900360164, 50.852500915527344], [6.344958782196159, 50.834781646728629], [6.333299160003776, 50.830631256103516], [6.340498924255428, 50.815849304199219], [6.300570964813176, 50.788150787353572], [6.32017993927002, 50.77008056640625], [6.354650020599365, 50.790050506591854], [6.35053205490118, 50.767391204834041], [6.363470077514592, 50.756580352783317], [6.345469951629696, 50.755958557128906], [6.312428951263541, 50.717269897460938], [6.308847904205379, 50.687141418457088], [6.27944993972784, 50.674800872802734], [6.336188793182373, 50.650680541992188], [6.377129077911491, 50.667079925537223], [6.385397911071891, 50.641139984130973], [6.409420013427734, 50.641941070556754], [6.410729885101432, 50.627010345459041], [6.380990028381404, 50.622291564941463], [6.393350124359188, 50.618961334228572], [6.388629913330078, 50.603839874267578], [6.413340091705322, 50.597171783447266], [6.38959789276123, 50.592658996581974], [6.396599769592285, 50.581680297851619], [6.36250209808361, 50.558170318603629], [6.364560127258414, 50.535869598388786], [6.352869987487907, 50.531761169433707], [6.376927852630615, 50.532550811767635], [6.366659164428768, 50.513610839843807], [6.253439903259221, 50.494831085205135], [6.180831909179688, 50.533061981201172], [6.175640106201229, 50.559852600097599], [6.278378963470516, 50.616397857665959], [6.209949970245475, 50.630920410156307], [6.173087120056209, 50.621433258056697], [6.159657955169621, 50.643730163574332], [6.178049087524414, 50.644531249999943], [6.187379837036133, 50.678600311279297], [6.210578918457031, 50.694549560546875], [6.18271017074585, 50.734630584716911], [6.199257850647029, 50.757850646972656], [6.172968864440975, 50.779270172119254], [6.189321041107235, 50.806289672851562], [6.065680980682316, 50.808109283447266], [6.050435066223258, 50.85033035278326], [6.0738401412965, 50.846858978271484], [6.087838172912654, 50.869640350341911], [6.077742099761963, 50.90677642822277]];



    var url = window.location.pathname;
    while (window.top == window.self && !useOwnCoordinates) {
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
                //console.log(states[i].properties.id + " " + states[i].properties.name);
                //console.log(states[i].geometry.coordinates[0]);
                var option = document.createElement('option');
                option.value = states[i].properties.name;
                option.innerHTML = states[i].properties.name;
                document.getElementById("stateList").appendChild(option);
            }
            document.getElementById("stateSelect").addEventListener("focusout", function () {
                document.getElementById("stateSelect").value;
                switch (document.getElementById("stateSelect").value) {

                    case "Baden-Württemberg": borderCoordinates = states[0].geometry.coordinates[0]; break;
                    case "Bayern": borderCoordinates = states[1].geometry.coordinates[0]; break;
                    case "Berlin": borderCoordinates = states[2].geometry.coordinates[0]; break;
                    case "Brandenburg": borderCoordinates = states[3].geometry.coordinates[0]; break;
                    case "Bremen": borderCoordinates = states[4].geometry.coordinates[0]; break;
                    case "Hamburg": borderCoordinates = states[5].geometry.coordinates[0]; break;
                    case "Hessen": borderCoordinates = states[6].geometry.coordinates[0]; break;
                    case "Mecklenburg-Vorpommern": borderCoordinates = states[7].geometry.coordinates[0]; break;
                    case "Niedersachsen": borderCoordinates = states[8].geometry.coordinates[0]; break;
                    case "Nordrhein-Westfalen": borderCoordinates = states[9].geometry.coordinates[0]; break;
                    case "Rheinland-Pfalz": borderCoordinates = states[10].geometry.coordinates[0]; break;
                    case "Saarland": borderCoordinates = states[11].geometry.coordinates[0]; break;
                    case "Sachsen-Anhalt": borderCoordinates = states[12].geometry.coordinates[0]; break;
                    case "Sachsen": borderCoordinates = states[13].geometry.coordinates[0]; break;
                    case "Schleswig-Holstein": borderCoordinates = states[14].geometry.coordinates[0]; break;
                    case "Thüringen": borderCoordinates = states[15].geometry.coordinates[0]; break;
                    default: break;
                }
                console.log(borderCoordinates);
            });
        });


    }
    while (url.includes("mission")) {
        console.log("Here we go");
        console.log(borderCoordinates);
        var missionId = url.split("/")[2];
        var missionUrl = window.top.document.getElementById("mission_caption_" + missionId);
        var missionLatitude = missionUrl.getAttribute("data-latitude");
        var missionLongitude = missionUrl.getAttribute("data-longitude");
        var missionCoordinates = [missionLongitude, missionLatitude];
        var missionIsInPolygon = inside(missionCoordinates, borderCoordinates);

    }


    function inside(point, vs) {
        // ray-casting algorithm based on
        // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

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

    if (url.includes("mission")) {
        if (!missionIsInPolygon) {
            var shareBtn = document.getElementById("mission_alliance_share_btn");
            shareBtn.classList.add("btn-warning");
            shareBtn.classList.remove("btn-success")
            var shareAlarmForwardBtn = document.getElementsByClassName("alert_next_alliance");
            for (var i = 0; i < shareAlarmForwardBtn.length; i++) {
                shareAlarmForwardBtn[i].classList.add("btn-warning");
                shareAlarmForwardBtn[i].classList.remove("btn-success");

            }
        }
    }


})();