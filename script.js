const apiKEY = "78e5bb915a42eff98d5a5776e1cb94cd";

const weatherData = document.getElementById("weather-data");

const cityInput = document.getElementById("city-input");

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value;
  getWeatherData(city);
});

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Oops!! Something went wrong.");
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${data.main.feels_like}`,
      `Humidity: ${data.main.humidity}%`,
      `Pressure: ${data.main.pressure}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherData.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherData.querySelector(".description").textContent = description;

    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = "";
    weatherData.querySelector(".temperature").textContent = "";
    weatherData.querySelector(".description").textContent =
      "Oops!! Something went wrong. Please try again later.";

    weatherData.querySelector(".details").innerHTML = "";
  }
}
