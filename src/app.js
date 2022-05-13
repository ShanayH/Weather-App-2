//set date and time
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let day = now.getDay();
let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
let theDay = days[now.getDay()];

let month = now.getMonth();
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
let theMonth = months[now.getMonth()];

let currentDateTime = document.querySelector("#currentDate");
currentDateTime.innerHTML = `${theDay} ${theMonth} ${date} | ${hours}:${minutes}`;

//change temp to temp of city being searched for

function showTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city-result");
  cityElement.innerHTML = response.data.name;

  let iconElement = document.querySelector("#weather-icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", `${response.data.weather[0].icon}`);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let lowForecastElement = document.querySelector("#low-forecast");
  lowForecastElement.innerHTML = Math.round(response.data.main.temp_min);

  let highForecastElement = document.querySelector("#high-forecast");
  highForecastElement.innerHTML = Math.round(response.data.main.temp_max);

  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  celsiusTemperature = response.data.main.temp;
}
//make search work

function search(city) {
  let apiKey = "2f4a61b0876133218968273ba29696cf";
  let units = "metric";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${units}`;

  axios.get(url).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-bar");
  search(searchElement.value);
}

//correct
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  //add the active class to the fahrenheit link
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemperature = null;

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");

  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//make JS control the document instead of HTML controlling it
//link to the FORM using the form id="#";
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

search("New York");

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);
