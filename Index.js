// API Key for OpenWeather API
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

// Function to fetch weather data
async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
        throw new Error('City not found');
    }
    
    const data = await response.json();
    return data;
}

// Function to display weather data
function displayWeather(data) {
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const weatherDescription = document.getElementById('weatherDescription');
    const weatherIcon = document.getElementById('weatherIcon');
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous error message
    errorMessage.textContent = '';

    // Update weather information
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDescription.textContent = `Condition: ${data.weather[0].description}`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

// Function to handle search button click
document.getElementById('searchButton').addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput').value;

    try {
        const weatherData = await fetchWeather(cityInput);
        displayWeather(weatherData);
    } catch (error) {
        document.getElementById('errorMessage').textContent = error.message;
    }
});
