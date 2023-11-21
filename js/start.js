// OpenWeatherMap API key (ACTIVE OLAN)
const apiKey = '2cd94028cc401a4e1c6f082b407749c4';

const cities = [
  { name: 'New York', id: '5128638' },
  { name: 'Washington, D.C.', id: '4140963' },
  { name: 'London', id: '2643743' },
  { name: 'Tokyo', id: '1850147' },
  { name: 'Paris', id: '2968815' },
  { name: 'Nur-Sultan', id: '1538317' },
  { name: 'Bishkek', id: '1528675' },
  { name: 'Moscow', id: '524894' },
  { name: 'Vilnius', id: '593116' },
  { name: 'Riga', id: '456172' },
  { name: 'Berlin', id: '2950158' },
  { name: 'Bratislava', id: '3060972' },
  { name: 'Tallinn', id: '588409' },
  { name: 'Warsaw', id: '756135' },
  { name: 'Oslo', id: '6453366' },
  { name: 'Bern', id: '2661552' },
  { name: 'Helsinki', id: '658225' },
  { name: 'Baku', id: '587084' },
  { name: 'Dublin', id: '2072525' },
  { name: 'Islamabad', id: '1162015' },
  { name: 'New Delhi', id: '1261481' },
  { name: 'Monaco', id: '2993458' },
  { name: 'Jakarta', id: '1642911' },
  { name: 'Ljubljana', id: '3196359' },
  { name: 'Lisbon', id: '2267057' },
  { name: 'Madrid', id: '1704129' },
  { name: 'Luxemburg', id: '5261340' },
  { name: 'Tirana', id: '3183875' },
  { name: 'Stockholm', id: '2673722' },
  { name: 'Seoul', id: '1835847' },
];

// Function to fetch weather data for each city
async function fetchWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return { name: city.name, weather: data.weather[0].icon, temp: data.main.temp };
}

// Function to display weather data in the moving bar
    // Function to fetch weather data for each city
    async function fetchWeather(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return {
          name: city.name,
          weather: data.weather[0].description,
          temp: data.main.temp,
          iconCode: data.weather[0].icon // Weather icon code from API response
        };
      }
  
// Function to display weather data with icons in the moving bar
async function displayWeather() {
const weatherBar = document.getElementById('weatherbar');
  
for (const city of cities) {
const weatherData = await fetchWeather(city);
  
const weatherItem = document.createElement('div');
weatherItem.classList.add('weatherItem');
  
const iconUrl = `http://openweathermap.org/img/wn/${weatherData.iconCode}.png`; // Constructing icon URL
const weatherIcon = document.createElement('img');
weatherIcon.src = iconUrl;
weatherIcon.alt = weatherData.weather;
  
const cityName = document.createElement('span');
cityName.textContent = `${weatherData.name}: ${weatherData.temp.toFixed(0)}°C`;
weatherItem.appendChild(cityName);
weatherBar.appendChild(weatherItem);
weatherItem.appendChild(weatherIcon);
          
        }
      }

// Call the function to display weather data
displayWeather();
// grabbing the input box, search button, location button,current weather box,and other 5 different boxes for the future weather and stores them 
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const API_KEY = "2cd94028cc401a4e1c6f082b407749c4";

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) {
        return `<div class="details">
                    <h2 style="padding-right: 10px;">${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6 style="padding-right: 10px;">Temperature: ${(weatherItem.main.temp - 273.15).toFixed(0)}°C</h6>
                    <h6 style="padding-right: 10px;">Wind: ${weatherItem.wind.speed} KM/H</h6>
                    <h6 style="padding-right: 10px;">Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon" title="${weatherItem.weather[0].description}">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else {
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon"  title="${weatherItem.weather[0].description}">
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(0)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} KM/H</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}
const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(WEATHER_API_URL)
        .then(response => response.json())
        .then(data => {
            const currentTemperature = data.list[0].main.temp - 273.15; // Current temperature in Celsius
            if (currentTemperature < 10) {
                alert(`The temperature in ${cityName} is less than 10°C. Please wear layered clothes and make sure to have something hot to drink, if you decide to go outside`);
            }

            const uniqueForecastDays = [];
            const fiveDaysForecast = data.list.filter(forecast => {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    return uniqueForecastDays.push(forecastDate);
                }
            });
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}
const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}
const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("An error occurred while fetching the city name!");
            });
        },
        error => {
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            }
            else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });

}
//ADDING LISTENERS TO LOCATION BUTTON WHICH USES GEOLOCATION API AND SEARCH BUTTON WHEN THEY CLICK SEARCH BUTTON RIGHT BELOW THE INPUT AREA AS WELL AS TO THE ENTER BUTTON
locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());
