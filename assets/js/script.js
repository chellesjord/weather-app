var cityFormEl = $("#city-form");
var cityInputEl = $("#cityName");
var futureContainerEl = $("#futureForcast-container");
var futureSearchTerm = $("#futureForcast-search-term");

//append date to current day
var currentDay = moment().format("L");
$("#date").text(currentDay);

//append dates to future days
var futureDay1 = moment().add(1, "day");
$("#fdate1").text(futureDay1.format("L"));
var futureDay2 = moment().add(2, "day");
$("#fdate2").text(futureDay2.format("L"));
var futureDay3 = moment().add(3, "day");
$("#fdate3").text(futureDay3.format("L"));
var futureDay4 = moment().add(4, "day");
$("#fdate4").text(futureDay4.format("L"));
var futureDay5 = moment().add(5, "day");
$("#fdate5").text(futureDay5.format("L"));

var formSubmitHandler = function (event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCityForcast(city);

        //clear old content
        futureContainerEl.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Please enter a city")
    }
};

var getCityForcast = function () {
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=afc02854dff0cf33f3674d9fbe5474da";

    //make a git request to url
    fetch(apiUrl).then(function (response) {
        //request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayCityData(data, cityNameEl);
            });
        } else {
            alert("Error: " + response.statusText)
        }
    })
        .catch(function (error) {
            alert("Unable to connect to WeatherAPI");
        });
};

var displayRepos = function (repos, searchTerm) {
    //check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "no repositories found.";
        return;
    }

    repoSearchTerm.textContent = searchTerm;
}

//add event listeners to search
//cityFormEl.addEventListener("sumbit", searchCityHandler)