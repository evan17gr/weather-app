//variables
var getLongtitude;
var getLatitude;
var api;
var url = "https://fcc-weather-api.glitch.me/api/current?";

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
    getData();
}


//new xmlhttprequest to request the JSON file depending on the user's location
function getData(){
    var req = new XMLHttpRequest();
    req.open("GET", api,true);
    req.send();
    req.onload = function(){
    var getText = JSON.parse(req.responseText);
    console.log(getText);
    var temperature = Math.floor(getText.main.temp);
    console.log(temperature);
    var city = getText.name;
    console.log(getText.name);
    var country =getText.sys.country;
    console.log(getText.sys.country);
    condition = getText.weather[0].main;
    condition = condition.toLowerCase();
    console.log(condition);
    var weatherIcon = getText.weather[0].icon;
    console.log(weatherIcon);
    setBackground(condition);
    }
        
}

//all the background images
var backgrounds = {"drizzle" : "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1547889066000/photosp/98bce4fe-79aa-40ab-bb8f-d9519a4b8e19/stock-photo-nature-water-rain-wet-copy-space-dew-drop-glass-transparent-98bce4fe-79aa-40ab-bb8f-d9519a4b8e19.jpg", "clouds" : "https://i.pinimg.com/736x/33/08/8a/33088a684f8af83e6b6be61828190a7b.jpg", "rain" : "https://wallpaperaccess.com/full/822264.jpg", "snow" : "https://wallpapertag.com/wallpaper/full/0/f/b/255747-vertical-winter-background-images-1080x1920-for-iphone-5s.jpg", "clear" : "https://images.fineartamerica.com/images-medium-large-5/ferry-boat-under-sun-vertical-view-dalibor-brlek.jpg", "thunderstorm" : "https://i.pinimg.com/originals/f6/88/b7/f688b74c09ed2f0804dea2620b43a378.jpg"};

//set the background according to the weather condition
function setBackground(weatherCondition){
    var background = document.getElementById("usersLocation");
    if( weatherCondition == "drizzle"){
        background.style.backgroundImage = "url(" + backgrounds.drizzle + ")";
    }
    else if(weatherCondition == "rain"){
        background.style.backgroundImage = "url(" + backgrounds.rain + ")";
    }
    else if(weatherCondition == "snow"){
        background.style.backgroundImage = "url(" + backgrounds.snow + ")";
    }
    else if(weatherCondition == "clear"){
        background.style.backgroundImage = "url(" +backgrounds.clear + ")";
    }
    else if(weatherCondition == "thunderstrom"){
        background.style.backgroundImage = "url(" +backgrounds.thunderstorm + ")";
    }
    else {
        background.style.backgroundImage = "url(" + backgrounds.clouds + ")";   
    }
}

