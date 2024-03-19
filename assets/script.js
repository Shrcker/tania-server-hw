const searchText = document.getElementById("weather-txt");
const searchButton = document.getElementById("search-button");
const forecastContainer = document.getElementById("forecast-container");
const searchContainer = document.getElementById("search-container");
const todaysWeather = document.getElementById("todays-weather");

const date = new Date();
const month = date.getMonth() + 1;
let day = date.getDate();
const year = date.getFullYear();
let cityList = JSON.parse(localStorage.getItem("city-list")) || []; // Array that will act as the localStorage's global surrogate

const searchCity = (e) => {
  // Function to search API for the user inputted city.
  e.preventDefault();

  const citySearch = searchText.value.toLowerCase(); // Saving value to let allows re-execution of function
  getApi(e, citySearch); //Search the API for that city's weather
  cityList.push(citySearch); // saving search value to localStorage array

  // Fetches the most up to date localStorage object
  const savedCities = JSON.parse(localStorage.getItem("city-list")) || [];
  const cityFound = savedCities.find((city) => city === citySearch);
  if (!cityFound) {
    // Saves a city search to localStorage and makes it a button if it has not already been searched
    searchContainer.innerHTML += `<button class="last-search" onclick="getApi(event, '${citySearch}')">${citySearch}</button>`;
    localStorage.setItem("city-list", JSON.stringify(cityList));
  }
};

const previousSearch = () => {
  const savedCities = JSON.parse(localStorage.getItem("city-list")) || [];
  for (const cities of savedCities) {
    searchContainer.innerHTML += `<button class="last-search" onclick="getApi(event, '${cities}')">${cities}</button>`;
  }
};

const getApi = (e, search) => {
  e.preventDefault();
  reset();
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=d33049b1401fc91a8e5b73ab2c0a4790`;
  fetch(weatherURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for (let i = 0; i < 6; i++) {
        let name = data.city.name;
        let currentDate = `(${month}-${day++}-${year})`;
        let clearness = data.list[i].weather[0].main;
        let isClear = clearness === "Clear" ? "☀️" : "☁️";
        let temperature = data.list[i].main.temp;
        let windSpeed = data.list[i].wind.speed;
        let humidity = data.list[i].main.humidity;

        if (i === 0) {
          let HTMLHeader = `
            <div>
            <h3>${name} ${isClear}</h3>
            <ul>Temp: ${temperature}°F</ul>
            <ul>Wind: ${windSpeed} MPH</ul>
            <ul>Humidity: ${humidity}%</ul>
            </div>`;

          todaysWeather.innerHTML += HTMLHeader;
        } else {
          let HTMLText = `
            <div class="weather-card">
            <h4 id="date">${currentDate}</h4>
            <h4 id="is-clear">${isClear}</h4>
            <ul>Temp: ${temperature}°F</ul>
            <ul>Wind Speed: ${windSpeed} MPH</ul>
            <ul>Humidity: ${humidity}%</ul>
            </div>`;

          forecastContainer.innerHTML += HTMLText;
        }
      }
    });
};

const reset = () => {
  todaysWeather.innerHTML = "";
  forecastContainer.innerHTML = "";
};

previousSearch();

// const createPreviousSearch = () => {
//   // Function to create elements from localStorage on page load
//   for (let i = 0; i < savedCities.length; i++) {
//     let HTMLText = `
//       The weather in ${savedCities[i]} is nice!`; // Placeholder text, replace with creating saved search buttons
//     let paragraphEl = document.createElement("p");
//     paragraphEl.innerText = HTMLText;
//     document.body.appendChild(paragraphEl);
//   }
// };

// if (savedCities) {
//   // Load localStorage if it exists on page load
//   createPreviousSearch();
// }
searchButton.addEventListener("click", searchCity);
