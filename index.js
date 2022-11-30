let now = new Date();
let h2 = document.querySelector("#current-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

h2.innerHTML = `${day}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let unit = "metric";
  let apiKey = "ce42a02472a5d3bb424243005811a2d3";
  let searchInput = document.querySelector("#search-city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}`).then(selectCity);
}

function selectCity(response) {
  let currentcity = response.data.name;
  let changecity = document.querySelector("#city-now");
  changecity.innerHTML = `${currentcity}`;
  let currenttemp = Math.round(response.data.main.temp);
  let changeTemp = document.querySelector("#temp-now");
  changeTemp.innerHTML = `${currenttemp}`;
  let currentmax = Math.round(response.data.main.temp_max);
  let changecurrentmax = document.querySelector("#temp-max");
  changecurrentmax.innerHTML = `${currentmax}`;
  let currentmin = Math.round(response.data.main.temp_min);
  let changecurrentmin = document.querySelector("#temp-min");
  changecurrentmin.innerHTML = `${currentmin}`;
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", search);

function changeCel(event) {
  event.preventDefault();
  let temperaturecelsius = document.querySelector("#temp-now");
  temperaturecelsius.innerHTML = 25;
}
let tempDegrees = document.querySelector("#centi");
tempDegrees.addEventListener("click", changeCel);

function changeFar(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let temperatureElement = document.querySelector("#temp-now");
let temperature = temperatureElement.innerHTML;

let tempFaren = document.querySelector("#far");
tempFaren.addEventListener("click", changeFar);

function showgeoTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ce42a02472a5d3bb424243005811a2d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showcurrentTemp);
}

function showcurrentTemp(response) {
  let actualtemp = Math.round(response.data.main.temp);
  let heading = document.querySelector("#temp-now");
  heading.innerHTML = `${actualtemp}`;

  let currentcity = response.data.name;
  let changecity = document.querySelector("#city-now");
  changecity.innerHTML = `${currentcity}`;
}

let getcurrentLocation = document.querySelector("#geolocation");
getcurrentLocation.addEventListener("click", showgeoTemp);
