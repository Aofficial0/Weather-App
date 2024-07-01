"use strict";

const apiKey = "ddcaa7c9ad8c545d308663b61cde1942";

const units = "metric"; //can use a selector no units = Kelvin, &units=metric = centigrade, &units=imperial = fahrenheit
const apiCallType = "forecast"; //current "weather", "forecast" for 5 day forecast

// const apiUrl = `https://api.openweathermap.org/data/2.5/${apiCallType}?q=${searchCity}&appid=${apiKey}&units=${units}`;

/**
 * Constants for search string 
 * button name and event listener.
 */
const searchCity = document.getElementById("location");
const buttonSearch = document.getElementById("get-weather");
//buttonSearch.addEventListener('click', handleClick);

/**
 * Constants for send to HTML elements
*/
const temperature = document.getElementById("temp");
const weather = document.getElementById("outlook");
const cityName = document.getElementById("city-name");
 
// const apiUrl = `https://api.openweathermap.org/data/2.5/${apiCallType}?q=Bristol&appid=${apiKey}&units=${units}`;
// fetch(apiUrl)                        //Connection Testing
//     .then(function (response) {
//         return response.json();
//     }).then(function (object) {
//         console.log(object);
//     });

/**
* This function parses the location entry and returns the requested data.
* Error handling not yet implemented.
*/
// function handleClick() {

//     //clr screen from previous?
//     const cityInput = searchCity.value;
//     //error /error catch for searchCity.innerText = "";
//     const apiUrl = `https://api.openweathermap.org/data/2.5/${apiCallType}?q=${cityName}&appid=${apiKey}&units=${units}`;

const apiUrl = `https://api.openweathermap.org/data/2.5/${apiCallType}?q=Bristol&appid=${apiKey}&units=${units}`;
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    }).then(function (object) {
        console.log(object);
        cityName.innerText = object.city.name;
        temperature.innerText = object.list[0].main.temp;
        weather.innerText = object.list[0].weather[0].main;
    });

