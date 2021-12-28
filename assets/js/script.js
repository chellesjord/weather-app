var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityName");
var futureContainerEl = document.querySelector("#futureForcast-container");
var futureSearchTerm = document.querySelector("#futureForcast-search-term");
var currentTemperature = document.querySelector("#currentTemp");

var formSubmitHandler = function (event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCityDayForcast(city);
        getCityWeekForcast(city);

        //clear old content
        cityInputEl.value = "";
    } else {
        alert("Please enter a city")
    }
    localStorage.setItem("city", city)
    saveCityHistory()
};

var pastCityHandler = function (event) {
    event.preventDefault();

    var city = localStorage.getItem("city");
    if (city) {
        getCityDayForcast(city);
        getCityWeekForcast(city);

        //clear old content
        cityInputEl.value = "";
    } else {
        alert("Please enter a city")
    }
}

var getCityDayForcast = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=afc02854dff0cf33f3674d9fbe5474da";

    fetch(apiUrl)
        .then(function (response) {
            //request was successful
            if (response.ok) {
                response.json().then(function (data) {

                    document.getElementById("dayBlock").setAttribute("class", "dayBlock");

                    //append date and city to current day
                    var currentDay = moment().format("L");
                    var city = data.name;
                    $("#date").text(city + " (" + currentDay + ")");

                    //current day weather
                    var currTemp = "Temp: " + data.main.temp;
                    var currWind = "Wind: " + data.wind.speed + "MPH";
                    var currHumidity = "Humidity: " + data.main.humidity + "%"
                    // var currUV = "UV Index" + data.

                    //append weather features to current day
                    $("#Temp").text(currTemp);
                    $("#Wind").text(currWind);
                    $("#Humidity").text(currHumidity);

                });
            } else {
                alert("Error: " + response.statusText)
            }
        })
        .catch(function (error) {
            alert("Unable to connect to WeatherAPI");
        });
};

var getCityWeekForcast = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=afc02854dff0cf33f3674d9fbe5474da";

    fetch(apiUrl)
        .then(function (response) {
            //request was successful
            if (response.ok) {
                response.json().then(function (data) {


                    var fivedayapi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly&cnt=6&units=imperial&appid=afc02854dff0cf33f3674d9fbe5474da";

                    fetch(fivedayapi)
                        .then(function (response) {
                            //request was successful
                            if (response.ok) {
                                response.json().then(function (data) {
                                    console.log(data);

                                    if (data.daily[0].uvi <= 2) {
                                        document.getElementById("UV").innerHTML = "UV Index: <span class='greenbg'>" + data.daily[0].uvi + "</span>";
                                    }
                                    else if (data.daily[0].uvi <= 7) {
                                        document.getElementById("UV").innerHTML = "UV Index: <span class='yellowbg'>" + data.daily[0].uvi + "</span>";
                                    }
                                    else {
                                        document.getElementById("UV").innerHTML = "UV Index: <span class='redbg'>" + data.daily[0].uvi + "</span>";
                                    }

                                    for (i = 1; i < 6; i++) {
                                        // append dates to future dates
                                        document.getElementById("fdate" + i).innerHTML = moment().add(i, "day").format("MM/DD/YYYY");
                                        // append weather icons to future dates
                                        document.getElementById("img" + i).src = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png";
                                        // append temperatures for future dates
                                        document.getElementById("temp" + i).innerHTML = data.daily[i].temp.day + "°F";
                                        // append wind for future dates
                                        document.getElementById("wind" + i).innerHTML = data.daily[i].wind_speed + " MPH";
                                        // append humidity for future dates
                                        document.getElementById("hum" + i).innerHTML = data.daily[i].humidity + " %";
                                    }
                                });
                            } else {
                                alert("Error: " + response.statusText)
                            }
                        })
                        .catch(function (error) {
                            alert("Unable to connect to WeatherAPI");
                        });
                });
            }
            else {
                alert("Error: " + response.statusText)
            }
        })
        .catch(function (error) {
            alert("Unable to connect to WeatherAPI");
        });
};

var saveCityHistory = function () {
    const savedCityBtn = document.createElement("button");
    var savedCities = localStorage.getItem("city");
    savedCityBtn.innerHTML = savedCities;
    document.getElementById("pastCityBtn").appendChild(savedCityBtn);
    //when I click the SavedCityBtn it should re-search that city
    savedCityBtn.addEventListener("click", pastCityHandler)
}

// saved multiply cities after refresh
saveCityHistory()

//add event listeners to search
cityFormEl.addEventListener("submit", formSubmitHandler);