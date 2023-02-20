const apiKey = "3f9a5826292d67cd8dc96d1ccb8272b1";
var cityHistory = [];
var cityArrayList = $("#city-array");
var searchButton = document.querySelector('#searchActivate');
var searchInput = document.querySelector('#theSearch');

//Calling Initialization Function 
init();

//Initialization Function 
function init() {
    //Get stored cities from localStorage
    //Parsing the JSON string to an object
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    // If cities were retrieved from localStorage, update the cities array to it
    if (storedCities !== null) {
        cityHistory = storedCities;
      }
    // Render cities to the DOM
    renderCities();

    // //Displaying the weather for the days
    // displayDayWeather();
}

function saveToLocalStorage() {
// Stringify and set "cities" key in localStorage to cities array
localStorage.setItem("cities", JSON.stringify(cityHistory));
console.log(localStorage);
}

// //retrieves key value pairs in local storage
// function retrieveLocalStorage(){
//     var number = JSON.parse(localStorage.getItem("searchNumber"));
//     dropDownEl = document.querySelector('#dropDown');
//     if(number !== undefined && number !== null){
//       for(var i = 1; i<=number; i++){
//         liEl = document.createElement('li');
//         liEl.classList.add('nav-item');
//         var aEl = document.createElement('a');
//         aEl.classList.add('nav-link', 'fs-4', 'title');
//         aEl.innerHTML = JSON.parse(localStorage.getItem(`search${i}`));
//         dropDownEl.appendChild(liEl);
//         liEl.appendChild(aEl);
//       }
//     }
//   }

function renderCities () { 
    cityArrayList.empty();
    
    // Render a new li for each city
    for (var i = 0; i < cityHistory.length; i++) {
      var city = cityHistory[i];
      
      var li = $("<li>").text(city);
      li.attr("id","listC");
      li.attr("data-city", city);
      li.attr("class", "list-group-item");
      console.log(li);
      cityArrayList.prepend(li);
    }
    //Get Response weather for the first city only
    if (!city){
        return
    } 
    else{
        getTodaysWeather(city);
    };
}

//submitting the form 
searchButton.on("click", function(event) {
    event.preventDefault();

    var city = searchInput.val().trim();

    if (city === "") {
        return;
    }
    else {
        cityHistory.push(city);
    }

    saveToLocalStorage();
    renderCities();
});

//Format for day
function FormatDay(date){
    var date = new Date();
    console.log(date);
    var month = date.getMonth()+1;
    var day = date.getDate();
    
    var dayOutput =  (month<10 ? '0' : '') + month + '/' +   
                    (day<10 ? '0' : '') + day + 
                    '/' + date.getFullYear();
    return dayOutput;
}

function getTodaysWeather(cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`; 

    //Clear content of today-weather
    $("#today-weather").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        
      // Create a new table row element
      cityTitle = $("<h3>").text(response.name + " "+ FormatDay());
      $("#today-weather").append(cityTitle);
      var TempetureToNum = parseInt((response.main.temp)* 9/5 - 459);
      var cityTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " °F");
      $("#today-weather").append(cityTemperature);
      var cityHumidity = $("<p>").text("Humidity: "+ response.main.humidity + " %");
      $("#today-weather").append(cityHumidity);
      var cityWindSpeed = $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH");
      $("#today-weather").append(cityWindSpeed);
      var CoordLon = response.coord.lon;
      var CoordLat = response.coord.lat;

      console.log(CoordLat);
      console.log(CoordLon);

       get5DayWeatherResponse(CoordLat, CoordLon, 1);
    });
}

//getting the next 5 day weather response
function get5DayWeatherResponse(lat, lon, cardNumber) {
    units = 'imperial';
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    
    var temp1;
    var windSpeed1;
    var wxIcon1;
    var humidity1;
    var when1;

    var temp2;
    var windSpeed2;
    var wxIcon2;
    var humidity2;
    var when2;

    var temp3;
    var windSpeed3;
    var wxIcon3;
    var humidity3;
    var when3;

    var temp4;
    var windSpeed4;
    var wxIcon4;
    var humidity4;
    var when4;
    
    var temp5;
    var windSpeed5;
    var wxIcon5;
    var humidity5;
    var when5;

    fetch(requestUrl)
        .then(function (response) {
            if(response.ok) {
                response.json.then(function(data) {
                    
                    
                //retreiving the data for the next 5 days 
                    temp1 = data.list[8].main.temp;
                    windSpeed1 = data.list[8].wind.speed;
                    wxIcon1 = data.list[8].weather[8].icon;
                    humidity1 = data.list[8].main.humidity;
                    when1 = data.list[8].dt_txt;

                    temp2 = data.list[16].main.temp;
                    windSpeed2 = data.list[16].main.temp;
                    wxIcon2 = data.list[16].weather[16].icon;
                    humidity2 = data.list[16].main.humidity;
                    when2 = data.list[16].dt_txt;

                    temp3 = data.list[32].main.temp;
                    windSpeed3 = data.list[32].wind.speed;
                    wxIcon3 = data.list[32].weather[32].icon;
                    humidity3 = data.list[32].main.humidity;
                    when3 = data.list[32].dt_txt;

                    temp4 = data.list[40].main.temp;
                    windSpeed4 = data.list[40].wind.speed;
                    wxIcon4 = data.list[40].weather[40].icon;
                    humidity4 = data.list[40].main.humidity;
                    when4 = data.list[40].dt_txt;

                    temp5 = data.list[48].main.temp;
                    windSpeed5 = data.list[48].wind.speed;
                    wxIcon5 = data.list[48].weather[48].icon;
                    humidity5 = data.list[48].main.humidity;
                    when5 = data.list[48].dt_txt;

                    //after getting all the weather data, display the data
                    displayWeather(wxIcon1, temp1, windSpeed1, humidity1, when1, wxIcon2, temp2, windSpeed2, humidity2, when2, wxIcon3, temp3, windSpeed3,
                        humidity3, when3, wxIcon4, temp4, windSpeed4, humidity4, when4, wxIcon5, temp5, windSpeed5, humidity5, when5, cardNumber);

                });
            }
            else {
                alert('Error: ' + response.statusText);
            }

        })
        .catch(function (error) {
            alert('Unable to connect to the OpenWeather API');
        }) 
}

function displayWeather (functIcon1, funcTemp1, funcWind1, funcHumidity1, funcWhen1, functIcon2, funcTemp2, funcWind2, funcHumidity2, funcWhen2, 
    functIcon3, funcTemp3, funcWind3, funcHumidity3, funcWhen3, functIcon4, funcTemp4, funcWind4, funcHumidity4, funcWhen4, 
    functIcon5, funcTemp5, funcWind5, funcHumidity5, funcWhen5, cardNumber) {

        wxEla = document.querySelector(`#wx-${cardNumber}a`);
        wxElb = document.querySelector(`#wx-${cardNumber}b`);
        wxElc = document.querySelector(`#wx-${cardNumber}c`);
        wxEld = document.querySelector(`#wx-${cardNumber}d`);
        wxEle = document.querySelector(`#wx-${cardNumber}e`);

        
        wxDay1Div = document.createElement('div');
        wxDay2Div = document.createElement('div');
        wxDay3Div = document.createElement('div');
        wxDay4Div = document.createElement('div');
        wxDay5Div = document.createElement('div');

        wxDay1Div.classList.add('card-body');
        wxDay2Div.classList.add('card-body');
        wxDay3Div.classList.add('card-body');
        wxDay4Div.classList.add('card-body');
        wxDay5Div.classList.add('card-body');

        //Day 1
        wxEla.appendChild(wxDay1Div);
        displayDayWeather(functIcon1, funcTemp1, funcWind1, funcHumidity1, funcWhen1);
        wxDay1Div.appendChild(wxDateP);
        wxDay1Div.appendChild(wxIconP);
        wxDay1Div.appendChild(wxTempP);
        wxDay1Div.appendChild(wxWindP);
        wxDay1Div.appendChild(wxHumP);

        //Day 2
        wxElb.appendChild(wxDay2Div);
        displayDayWeather(functIcon2, funcTemp2, funcWind2, funcHumidity2, funcWhen2);
        wxDay2Div.appendChild(wxDateP);
        wxDay2Div.appendChild(wxIconP);
        wxDay2Div.appendChild(wxTempP);
        wxDay2Div.appendChild(wxWindP);
        wxDay2Div.appendChild(wxHumP);

        //Day 3
        wxElc.appendChild(wxDay3Div);
        displayDayWeather(functIcon3, funcTemp3, funcWind3, funcHumidity3, funcWhen3);
        wxDay3Div.appendChild(wxDateP);
        wxDay3Div.appendChild(wxIconP);
        wxDay3Div.appendChild(wxTempP);
        wxDay3Div.appendChild(wxWindP);
        wxDay3Div.appendChild(wxHumP);
        
        //Day 4
        wxEld.appendChild(wxDay4Div);
        displayDayWeather(functIcon4, funcTemp4, funcWind4, funcHumidity4, funcWhen4);
        wxDay4Div.appendChild(wxDateP);
        wxDay4Div.appendChild(wxIconP);
        wxDay4Div.appendChild(wxTempP);
        wxDay4Div.appendChild(wxWindP);
        wxDay4Div.appendChild(wxHumP);

        //Day 5
        wxEle.appendChild(wxDay5Div);
        displayDayWeather(functIcon5, funcTemp5, funcWind5, funcHumidity5, funcWhen5);
        wxDay5Div.appendChild(wxDateP);
        wxDay5Div.appendChild(wxIconP);
        wxDay5Div.appendChild(wxTempP);
        wxDay5Div.appendChild(wxWindP);
        wxDay5Div.appendChild(wxHumP);

}

function displayDayWeather(functIcon, funcTemp, funcWind, funcHumidity, funcWhen) {
    var mark = funcWhen;
    wxDateP = document.createElement('p');
    wxIconP = document.createElement('p');
    wxTempP = document.createElement('p');
    wxWindP = document.createElement('p');
    wxHumP = document.createElement('p');
    wxDateP.innerHTML = `${dayjs(mark).format('ddd, D MMM')}`;
    displayWeatherIcon(wxIconP, functIcon);
    wxTempP.innerHTML = `Temp: ${funcTemp} °F`;
    wxWindP.innerHTML = `Wind: ${funcWind} MPH`;
    wxHumP.innerHTML = `Humidity: ${funcHumidity} %`;
}

function displayWeatherIcon(appendEl, iconCode){
    var imgEl = document.createElement("img");
    imgEl.src = `http://openweathermap.org/img/wn/${iconCode}.png`
    appendEl.appendChild(imgEl);
}
