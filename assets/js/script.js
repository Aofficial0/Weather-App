"use strict";

const apiKey = "ddcaa7c9ad8c545d308663b61cde1942";

const units = "metric"; //can use a selector no units = Kelvin, &units=metric = centigrade, &units=imperial = fahrenheit
const apiCallType = "weather"; //Current weather, Change to "forecast" for 5 day forecast

const apiUrl = `https://api.openweathermap.org/data/2.5/${apiCallType}?q=${searchCity}&appid=${apiKey}&units=${units}`;

const searchCity = document.getElementById("location");
const buttonSearch = document.getElementById("get-weather");
buttonSearch.addEventListener('click', handleClick);

const temperature = document.getElementById("temp");
const weather = document.getElementById("outlook");

// fetch(apiUrl)                        //Connection Testing
//     .then(function (response) {
//         return response.json();
//     }).then(function (object) {
//         console.log(object);
//     });


function handleClick() {
    const cityInput = searchCity.value;
    //error /error catch for searchCity.innerText = "";


}