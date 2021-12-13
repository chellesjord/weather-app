var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityName");
var futureContainerEl = document.querySelector("#futureForcast-container");
var futureSearchTerm = document.querySelector("#futureForcast-search-term");
var currentTemperature = document.querySelector("#currentTemp");


//append dates to future days
// var futureDay1 = moment().add(1, "day").format("MM/DD/YYYY"));
// var futureDay2 = moment().add(2, "day").format("MM/DD/YYYY"));
// var futureDay3 = moment().add(3, "day").format("MM/DD/YYYY"));
// var futureDay4 = moment().add(4, "day").format("MM/DD/YYYY"));
// var futureDay5 = moment().add(5, "day").format("MM/DD/YYYY"));

var formSubmitHandler = function (event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCityDayForcast(city);
        getCityWeekForcast(city);

        //clear old content
        futureContainerEl.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Please enter a city")
    }
};

var getCityDayForcast = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=afc02854dff0cf33f3674d9fbe5474da";

    fetch(apiUrl)
        .then(function (response) {
            //request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

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
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + "&cnt=6&appid=afc02854dff0cf33f3674d9fbe5474da";

    for (var i = 1; i < 6; i++) {
        var futureDayName = moment().add(i, "day").format("MM/DD/YYYY");
        console.log(futureDayName);

        //         //create a container for each day
        //         var futureEl = document.createElement("div");
        //         futureEl.classList = "col-2 forcastDays futureForecast-container"

        //         //create a span element to hold city name
        //         var titleEl = document.createElement("span");
        //         titleEl.textContent = futureDayName;

        //         //append to container
        //         futureEl.appendChild(titleEl);

        //         //creat a status element
        //         var statusEl = document.createElement("span");
        //         statusEl.classList = "flex-row alrign-center";

        //         //append container to the dom
        //         futureContainerEl.appendChild(futureEl);

        //         // <div class="col-2 forcastDays" id="futureForcast-container">
        //         //     <p class="date" id="fdate1"></p>
        //         //     <p class="weatherIcon">ICON</p>
        //         //     <p class="futureTemp">54degress</p>
        //         //     <p class="futureWind">12 MPH</p>
        //         //     <p class="futureHumidity">55%</p>
        //         // </div>
        //     }
        // };
    }
};

//add event listeners to search
cityFormEl.addEventListener("submit", formSubmitHandler);