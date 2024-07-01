"use strict";
const apiKey = "ddcaa7c9ad8c545d308663b61cde1942";

const units = "metric"; // Can use a selector: no units = Kelvin, &units=metric = Centigrade, &units=imperial = Fahrenheit
const apiCallType = "forecast"; // //"weather" for current data, "forecast" for 5 day forecast

const cityName = document.getElementById('city');
const icon = document.getElementById("image");
const weather = document.getElementById('outlook');
const temp = document.getElementById('temperature');
const humid = document.getElementById('humidity');
const coverage = document.getElementById('clouds');
const bar = document.getElementById('pressure');
const forecastFive = document.getElementById("WeatherAccordion");

const buttonElement = document.getElementById('search'); // Pinched from Kevin
const inputElement = document.getElementById('location'); // Pinched from Kevin
buttonElement.addEventListener('click', handleClick);

function handleClick() {
    forecastFive.innerHTML = ""; // Clear any existing forecast data
    const cityInput = inputElement.value; // Get the user's input
    const apiURL = `https://api.openweathermap.org/data/2.5/${apiCallType}?q=${cityInput}&appid=${apiKey}&units=${units}`; // Construct the API URL
    fetch(apiURL)
   .then(function (response) {
        if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
        return response.json(); // Parse the JSON response
    })
   .then(function (data) { // Process the parsed JSON
        console.log(data); // Log the data for debugging
        cityName.innerText = data.name; // Display the city name

        const imageCode = data.weather[0].icon; // Get the weather icon code
        const imageUrl = `https://openweathermap.org/img/wn/${imageCode}@2x.png`; // Construct the full URL for the icon
        icon.src = imageUrl; // Set the source of the icon element

        weather.innerText = data.weather[0].main; // Display the main weather description
        temp.innerText = data.main.temp; // Display the temperature
        humid.innerText = data.main.humidity; // Display the humidity
        coverage.innerText = data.clouds.all; // Display the cloud cover percentage
        bar.innerText = data.main.pressure; // Display the atmospheric pressure
    })
   .catch(function (error) {
        console.error('Error:', error); // Log any errors that occur during fetching or processing
    });
}