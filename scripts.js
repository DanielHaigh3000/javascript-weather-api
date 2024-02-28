// Require things
import 'dotenv/config';

// Select things
const weatherContainer = document.querySelector('.weather__container');

const getLocation = async function () {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        resolve(coords);
      });
    } else {
      reject('Error processing geolocation');
    }
  });
};

const getWeather = async function () {
  try {
    // Declare variables
    const API_KEY = `${process.env.WEATHER_API_KEY}`;

    // Get lon and lat for our location
    const { lat, lon } = await getLocation();

    // Fetch our weather data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    // Throw an error if the response is not ok
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    // Pull data from the response
    const data = await response.json();

    // Create our HTML element with the pulled data
    const html = `
      <div class="weather__type__container">
        <h2>${data.weather[0].main}</h2>
        <img src="https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }.png" alt="" />
        <h3>${data.weather[0].description}</h3>
      </div>
      <div class="weather__info__container">
        <h2>Current Weather In</h2>
        <h3>${data.name}</h3>
        <h3 class="weather__temp">${data.main.temp} &deg;C</h3>
        <div class="weather__info__details">
          <div class="weather__info__details--left">
            <p>Feels Like: ${data.main.feels_like} &deg;C</p>
            <p>Temp Low: ${data.main.temp_min} &deg;C</p>
            <p>Temp High: ${data.main.temp_max} &deg;C</p>
          </div>
          <div class="weather__info__details--right">
            <p>Clouds: ${data.clouds.all}%</p>
            <p>Wind Speed: ${(data.wind.speed * 3.6).toFixed(2)} km/h</p>
            <p>Humidity: ${data.main.humidity}%</p>
          </div>
        </div>
      </div>
      `;

    // Insert new HTML into our webpage
    weatherContainer.innerHTML = html;
  } catch (error) {
    console.error(`${error}`);
  }
};

getWeather();

/*************************************
 TO-DO'S
*************************************/
// v1. Display some basic weather stuff
// v2. Display icons depending on weather (e.g. sun, clouds, rain drops, snow flakes)
// v3. Provide options to user to choose their own city (and other options)
