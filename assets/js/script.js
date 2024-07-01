"use strict";

const apiKey = "ddcaa7c9ad8c545d308663b61cde1942";


const units = "metric"; //can use a selector no units = Kelvin, &units=metric = centigrade, &units=imperial = fahrenheit
const apiCallType = "weather"; //Current weather

const city = document.getElementById("location");

const apiUrl = `https://api.openweathermap.org/data/2.5/${apiCallType}?q=Bristol&appid=${apiKey}&units=${units}`;


fetch(apiUrl)
    .then(function (response) {
        console.log(json);
    }).then(function (object) {
        console.log(object);
    });
    