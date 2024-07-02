// get all the html needed for the api  by ID

let searchValue = document.getElementById('location');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.getElementById('outlook');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
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
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + key;

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
            city.querySelector('figcaption').innerText = data.name;
            // Update the city flag image based on the country code
            city.querySelector('img').src = 'https://flagsapi.com/' + data.sys.country + '/shiny/32.png';
            //update the temperature icon 
            temperature.querySelector('img').src = 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png';
             //updated the temperature itself  
            temperature.querySelector('figcaption span').innerText = data.main.temp;
            // Update humidity
            humidity.textContent = data.main.humidity + '%';

        // Update pressure (assuming pressure is in hPa)
           pressure.textContent = data.main.pressure + ' hPa';

        // Update cloud percentage
           clouds.textContent = data.clouds.all + '%';
        }
    })
}



