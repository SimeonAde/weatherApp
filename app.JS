const api = {
  key: "9f888d85258ef3e7b7f0e4dea73f6e13",
  base: "https://api.openweathermap.org/data/2.5/",
};

let searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);
function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weatherResult) {
  let city = document.querySelector(".location .city");
  console.log(weatherResult);
  city.innerText = `${weatherResult.name} , ${weatherResult.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector("#temp-value");
  temp.innerHTML = `${Math.round(weatherResult.main.temp)}`;
  console.log(weatherResult.main.temp);

  const icon = `http://openweathermap.org/img/wn/${weatherResult.weather[0].icon}@2x.png`;
  console.log(icon);
  let iconEl = document.querySelector(".current .icon");
  iconEl.src = icon;

  let feels = document.querySelector(".current .feelslike");
  feels.innerHTML = `Feels like &nbsp:&nbsp ${Math.round(
    weatherResult.main.feels_like
  )}<span>°c</span>`;

  let weatherr = document.querySelector(".current .weather");
  weatherr.innerText = `${weatherResult.weather[0].main}`;

  let weatherDesciption = document.querySelector(".current .description");
  weatherDesciption.innerText = `${weatherResult.weather[0].description}`;

  let hilow = document.querySelector(".current .hi-low");
  hilow.innerText = `${Math.round(weatherResult.main.temp_min)}°c/ ${Math.round(
    weatherResult.main.temp_max
  )}°c`;

  // icon.innerHTML = `${icon} alt=${weather.weather[0]["main"]}`;

  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
}

let tempValueEl = document.querySelector("#temp-value");
let tempUnitEl = document.querySelector("#temp-unit");

tempValueEl.addEventListener("click", toggleBetweenCelsiusAndFahrenheit);
function toggleBetweenCelsiusAndFahrenheit(event) {
  let unit = tempUnitEl.innerText;

  if (unit == "°c") {
    let celcius = event.target.innerText;
    let fValue = convertCelsiusToFahrenheit(celcius);
    tempValueEl.innerText = fValue;
    tempUnitEl.innerText = "°F";
  } else {
    let fahrenheit = event.target.innerText;
    let cVALUE = convertFahrenheitToCelcius(fahrenheit);
    tempValueEl.innerText = cVALUE;
    tempUnitEl.innerText = "°c";
  }
}

function convertCelsiusToFahrenheit(celcius) {
  return celcius * 1.8 + 32;
}

function convertFahrenheitToCelcius(fahrenheit) {
  return (fahrenheit - 32) / 1.8;
}
