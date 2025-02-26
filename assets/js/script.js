"use strict";
// get all the html needed for the api  by ID

const searchValue = document.getElementById('location');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const description = document.getElementById('outlook');
const clouds = document.getElementById('clouds');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const main = document.querySelector('main');
const forecast = document.getElementById("fiveday"); //5 day forecast to html



// event handler for the form 
let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(searchValue.value != ''){
        searchWeather();
    }
});

// API key for OpenWeatherMap
const key = 'e6d14a5b27f7e8a75ce9753d6de7a74b';

// Base URL for the OpenWeatherMap API, with units set to metric
const url = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + key;


// Function to search for weather data based on user input
const searchWeather = () => {
    // Clear Forecast
    forecast.innerHTML = ""; 
    // Fetch weather data from the API, appending the user-provided search value to the URL
    fetch(url + '&q=' + searchValue.value)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        console.log(data); // Log the response data for debugging
        // If the API response is successful (status code 200)
        if(data.cod == 200){
            // Update the city name in the HTML
            city.querySelector('figcaption').innerText = data.city.name;
            // Update the city flag image based on the country code
            city.querySelector('img').src = 'https://flagsapi.com/' + data.city.country + '/shiny/32.png';
            //update the temperature icon 
            temperature.querySelector('img').src = 'https://openweathermap.org/img/wn/'+data.list[0].weather[0].icon+'@2x.png';
             // Update the temperature itself
            let temp =  data.list[0].main.temp;
            let roundTemp = Math.round(temp);
            temperature.querySelector('figcaption span').innerText = roundTemp;
            // Update the weather description
            description.textContent = data.list[0].weather[0].description;
            // Update humidity
            humidity.textContent = data.list[0].main.humidity;
            // Update pressure (assuming pressure is in hPa)
            pressure.textContent = data.list[0].main.pressure;
            // Update cloud percentage
            clouds.textContent = data.list[0].clouds.all;
            /**
             * Get Weather descriptor from JSON and apply correct background image
             */
            const weatherDescriptor = data.list[0].weather[0].main; // Set Weather descriptor for background links
            //console.log(weatherDescriptor); // check weatherDescriptor output
            if (weatherDescriptor === "Clear") {  //Set background image
                document.body.style.backgroundImage = 'url("assets/images/sunny_scaled.jpg")';
            } else if (weatherDescriptor === "Clouds") {
                document.body.style.backgroundImage = 'url("assets/images/cloudy_scaled.jpg")';
            } else if (weatherDescriptor === "Rain") {
                document.body.style.backgroundImage = 'url("assets/images/rain_scaled.jpg")';
            } else if (weatherDescriptor ==- "Snow") {
                document.body.style.backgroundImage = 'url("assets/images/snow_scaled.jpg")';
            }            
            /**
             * 24 hour forecast parser
             */
            for (let w = 7; w < 40; w+=8) { 
                const dayData = data.list[w] ;
                /**
                 * Round temp up or down
                 */              
                let dtemp =  dayData.main.temp;
                let droundTemp = Math.round(dtemp);
                /**
                * Consts for parser
                */
                const dayTemp = droundTemp;
                const dayHumid = dayData.main.humidity;
                const dayClouds = dayData.clouds.all;
                // Generate day
                const timeStamp = dayData.dt;
                const dateTime = new Date(timeStamp * 1000);
                const dayOfWeek = dateTime.toLocaleDateString("en-GB", { weekday: 'long' });

                const forPop = `
                <div class="forecast-item">
                     <h4 class="centered" id="dow">${dayOfWeek}</h4>
                     <h4 class="centered" id="dat">${dayTemp}<sup>o</sup></h4>
                    <div class="humidity-clouds-row centered">
                         <h5 class="centered" id="dac">${dayClouds} <span>%</span> <i class="fa-solid fa-cloud"></i></h5>
                         <h5 class="centered" id="dah">${dayHumid}<span>%</span> <i class="fa-solid fa-droplet"></i></h5>
                    </div>
                </div>
                `;
                forecast.innerHTML += forPop;
            }    
        } else {
            // false if cod != 200
            //run the error effect
            main.classList.add('error');
            // set time out so after 1 sec main clear the error and if new error came it runs the animation again 
            setTimeout(() => {
                main.classList.remove('error');
            }, 1000);
        }
        // clear input contant 
        searchValue.value = '' ;
    });
};

// for when a user enter the app for first time should find london data displayed 

const initApp = () => {
    searchValue.value = "London";
    searchWeather();
};
initApp();

