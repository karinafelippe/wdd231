const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Substitua pelo seu API key
const city = 'Itu,BR';
const units = 'metric';

async function fetchWeather() {
    // Current weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    // 3-day forecast (OpenWeatherMap's forecast is every 3h, so we filter for 12:00)
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

    const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
    ]);
    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    displayWeather(weatherData, forecastData);
}

function displayWeather(current, forecast) {
    // Current weather
    const weatherCard = document.querySelector('.card-title:contains("Current Weather")').parentElement;
    weatherCard.querySelector('.card-body').innerHTML = `
        <p>
            <strong>${Math.round(current.main.temp)}°C</strong>, 
            ${current.weather[0].description.charAt(0).toUpperCase() + current.weather[0].description.slice(1)}
        </p>
    `;

    // 3-day forecast
    const forecastCard = document.querySelector('.card-title:contains("Weather Forecast")').parentElement;
    // Filter for 12:00:00 time for the next 3 days
    const forecastList = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    let forecastHtml = '';
    forecastList.forEach(item => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        forecastHtml += `
            <div>
                <strong>${day}:</strong> ${Math.round(item.main.temp)}°C, 
                ${item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}
            </div>
        `;
    });
    forecastCard.querySelector('.card-body').innerHTML = forecastHtml;
}

document.addEventListener('DOMContentLoaded', fetchWeather);