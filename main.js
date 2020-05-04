//variables
var getLongtitude;
var getLatitude;
var url = "https://fcc-weather-api.glitch.me/api/current?";

//ask for users permission
window.onload = function getUsersPosition(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getLatitudeAndLongtitude);
        getObjs();
    }
    else{
        alert("Your browser doesn't support geolocation");
    }
}

//get the user's longtitude and latitude
function getLatitudeAndLongtitude(position){
    var getLatitude = position.coords.latitude;
    var getLongtitude = position.coords.getLongtitude;
}

var api = url + "lat=" +getLatitude + "&" + "lon=" + getLongtitude;

//new xmlhttprequest
function getObjs(){
    var req = new XMLHttpRequest();
    req.open("GET", api,true);
    req.onload = function(){
        const getText = JSON.parse(req.responseText);
        console.log(getText);   
    }
    req.send();
}
