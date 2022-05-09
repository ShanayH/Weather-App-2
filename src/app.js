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

//change h1 to the city being searched for
let apiKey = "2f4a61b0876133218968273ba29696cf";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&${units}`;
let units = "metric";
let city = "London";

function search(event) {
  event.preventDefault();
  //city-result is the (h1)
  let citySearch = document.querySelector("#city-result");
  let searchBar = document.querySelector("#search-bar").value;

  citySearch.innerHTML = `${searchBar}`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar}&APPID=${apiKey}&units=${units}`;
  axios.get(weatherUrl).then(showTemp);
}

let Search = document.querySelector("#search-button");
Search.addEventListener("click", search);

let submitEvent = document.querySelector("#search-bar");
submitEvent.addEventListener("submit", search);
