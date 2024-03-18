const searchText = document.getElementById("weather-txt");
const searchButton = document.getElementById("search-button");
const forecastContainer = document.getElementById("forecast-container");
const searchContainer = document.getElementById("search-container");
const todaysWeather = document.getElementById("todays-weather");
const savedCities = JSON.parse(localStorage.getItem("city-list"));
const date = new Date();
const month = date.getMonth() + 1;
let day = date.getDate();
const year = date.getFullYear();
let cityList = [];

const searchCity = (e) => {
  // Function to search API for the user inputted city.
  e.preventDefault();
  const citySearch = searchText.value.toLowerCase(); // Saving value to let allows re-execution of function
  getApi(e, citySearch);
  searchContainer.innerHTML += `<button onclick=getApi(event, '${citySearch}')>${citySearch}</button>`;
  cityList.push(citySearch);

  const cityFound = savedCities.find((city) => city === citySearch);
  if (!cityFound) {
    localStorage.setItem("city-list", JSON.stringify(cityList));
  }
  reset();
};

const previousSearch = (name) => {
  for (const cities of name) {
    searchContainer.innerHTML += `<button onclick="getApi(event, '${cities}')">${cities}</button>`;
  }
};

const getApi = (e, search) => {
  e.preventDefault();
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=d33049b1401fc91a8e5b73ab2c0a4790`; //&appid={API key}";
  //reset();
  fetch(weatherURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for (let i = 0; i < 5; i++) {
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

//previousSearch(savedCities);

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
