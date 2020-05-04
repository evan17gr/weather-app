//variables
var getLongtitude;
var getLatitude;
var api;
var url = "https://fcc-weather-api.glitch.me/api/current?";
var getText;

//ask for users permission
window.onload = function getUsersPosition(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getLatitudeAndLongtitude);
    }
    else{
        alert("Your browser doesn't support geolocation");
    }
}

//get the user's longtitude and latitude
function getLatitudeAndLongtitude(position){
    getLatitude = position.coords.latitude;
    getLongtitude = position.coords.longitude;
    api = url + "lat=" +getLatitude + "&" + "lon=" + getLongtitude;
    getObjs();
}


//new xmlhttprequest to request the JSON file depending on the user's location
function getObjs(){
    var req = new XMLHttpRequest();
    req.open("GET", api,true);
    req.send();
    req.onload = function(){
    getText = JSON.parse(req.responseText);
    console.log(getText);}
    
}
