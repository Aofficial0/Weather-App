// get all the html needed for the api  by ID

const searchValue = document.getElementById('location');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const description = document.getElementById('outlook');
const clouds = document.getElementById('clouds');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const main = document.querySelector('main');
// event handler for the form 
let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(searchValue.value != ''){
        searchWeather();
    }
})


// API key for OpenWeatherMap
let key = 'e6d14a5b27f7e8a75ce9753d6de7a74b';

// Base URL for the OpenWeatherMap API, with units set to metric
let url = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + key;

// Function to search for weather data based on user input
const searchWeather = () => {
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
             //updated the temperature itself  
            temperature.querySelector('figcaption span').innerText = data.list[0].main.temp;
            // update the temperature description
            description.innerText = data.list[0].weather[0].description;
            // Update humidity
            humidity.textContent = data.list[0].main.humidity;

            // Update pressure (assuming pressure is in hPa)
            pressure.textContent = data.list[0].main.pressure;

            // Update cloud percentage
            clouds.textContent = data.list[0].clouds.all;

            for (let w = 7; w < 40; w+=8) {  // 24 hour forecast parser
                /**
                 * 
                 */              
                const accDay = document.getElementById('accordion-button');
                const accTmp = document.getElementById('temperaturestatus1');
                const accHmd = document.getElementById('humiditystatus1');
                const accCld = document.getElementById('cloudstate1');
                /**
                 * Consts for parser
                 */
                const dayTemp = data.list[w].main.temp;
                const dayHumid = data.list[w].main.humidity;
                const dayClouds = data.list[w].clouds.all;                
                // Update daily temp 
                accTmp.textContent = dayTemp;
                // Update daily humidity
                accHmd.textContent = dayHumid;
                // Update daily cloud percentage
                accCld.textContent = dayClouds;
                // Update weekday
                const timeStamp = object.list[w].dt;
                const dateTime = new Date(timeStamp * 1000);
                const dayOfWeek = dateTime.toLocaleDateString("en-GB", { weekday: 'long' });
                accDay.textContent = dayOfWeek;

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
    })
}
// for when a user enter the app for first time should find london data displayed 

const initApp = () => {
    searchValue.value = "London"
    searchWeather();
}
initApp();

