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
    getWeather(41.9028,12.4964,"italy-temperature","italy-city","italy-country","italy-icon","italy-condition");
    getWeather(37.983810,23.727539,"athens-temperature","athens-city","athens-country","athens-icon","athens-condition");  
    
}


//new xmlhttprequest to request the JSON file depending on the user's location and display the weather
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
    var country =getText.sys.country;
    var condition = getText.weather[0].main;
    condition = condition.toLowerCase();
    setBackground(condition);
    document.getElementById("location-condition").innerHTML = condition;
    document.getElementById("location-city").innerHTML = city;
    document.getElementById("location-country").innerHTML = country;
    document.getElementById("location-temperature").innerHTML = temperature;
    document.getElementById("location-icon").src = getText.weather[0].icon;
    changeUnit("italy-temperature","italy-unit"); 
    changeUnit("location-temperature","location-unit");
    changeUnit("athens-temperature","athens-unit");
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
    document.getElementById("italy").style.backgroundImage = "url(https://wallpapershome.com/images/pages/pic_v/5073.jpg)";
    document.getElementById("athens").style.backgroundImage = "url(https://images.fineartamerica.com/images-medium-large-5/3-athens-attica-greece-porch-panoramic-images.jpg)";
    
}

//get the weather for athens and italy
function getWeather(lat,lon,tempElement,cityElement,countryElement,iconElement,conditionElement){
    var req = new XMLHttpRequest();
    req.open("GET",url+ "lat="+lat+ "&" + "lon=" +lon, true);
    req.send();
    req.onload = () => {
        var getJSONData = JSON.parse(req.responseText);
        console.log(getJSONData);
        var temperature = Math.floor(getJSONData.main.temp);
        var city = getJSONData.name;
        var country =getJSONData.sys.country;
        getJSONData.weather[0].icon;
        var condition = getJSONData.weather[0].main;
        document.getElementById(tempElement).innerHTML = temperature;
        document.getElementById(cityElement).innerHTML = city;
        document.getElementById(countryElement).innerHTML = country;
        document.getElementById(iconElement).src = getJSONData.weather[0].icon;;
        document.getElementById(conditionElement).innerHTML = condition;
    }
}

//change the units of the temperature
$(document).ready(function(){
    $("#checkbox").toggle(
      function(){
        var temperature = document.getElementById("italy-temperature").textContent;
        var fahrenheit = Math.round((temperature*9/5)+32);
        document.getElementById("italy-temperature").innerHTML = fahrenheit;
        document.getElementById("italy-unit").innerHTML = "F";
        var temperature2 = document.getElementById("location-temperature").textContent;
        var fahrenheit2 = Math.round((temperature2*9/5)+32);
        document.getElementById("location-temperature").innerHTML = fahrenheit2;
        document.getElementById("location-unit").innerHTML = "F";
        var temperature3 = document.getElementById("athens-temperature").textContent;
        var fahrenheit3 = Math.round((temperature3*9/5)+32);
        document.getElementById("athens-temperature").innerHTML = fahrenheit3;
        document.getElementById("athens-unit").innerHTML = "F";
      },
      function(){
        var temperature = document.getElementById("italy-temperature").textContent;
        var celsius = Math.round((temperature-32)*5/9); 
        document.getElementById("italy-temperature").innerHTML = celsius;
        document.getElementById("italy-unit").innerHTML = "C";
        var temperature2 = document.getElementById("location-temperature").textContent;
        var celsius2 = Math.round((temperature2-32)*5/9); 
        document.getElementById("location-temperature").innerHTML = celsius2;
        document.getElementById("location-unit").innerHTML = "C";
        var temperature3 = document.getElementById("athens-temperature").textContent;
        var celsius3 = Math.round((temperature3-32)*5/9); 
        document.getElementById("athens-temperature").innerHTML = celsius3;
        document.getElementById("athens-unit").innerHTML = "C";
    });
    
});