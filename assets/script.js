const searchText = document.getElementById("weather-txt");
const searchButton = document.getElementById("search-button");
const savedCities = JSON.parse(localStorage.getItem("city-list"));
const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();
const year = date.getFullYear();
let cityList = [];

const searchCity = (e) => {
  // Function to search API for the user inputted city.
  e.preventDefault();
  const citySearch = searchText.value.toLowerCase(); // Saving value to let allows re-execution of function
  getApi(citySearch);
  cityList.push(citySearch);
  localStorage.setItem("city-list", JSON.stringify(cityList));
  searchText.value = "";

  // Create new elements based on user input
  let HTMLText = `
    The weather in ${citySearch} is nice!`;
  let paragraphEl = document.createElement("p");
  paragraphEl.innerText = HTMLText;
  document.body.appendChild(paragraphEl);
};

const getApi = (search) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=e30f5243260d367c3dd383499a1d3638`; //&appid={API key}";
  fetch(weatherURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for (let i = 0; i < 4; i++) {
        let name = data.city.name;
        let currentDate = `(${month}-${day}-${year})`;
        let clearness = data.list[i].weather[0].main;
        let isClear = clearness === "Clear" ? "☀️" : "☁️";
        let temperature = data.list[i].main.temp;
        let windSpeed = data.list[i].wind.speed;
        let humidity = data.list[i].main.humidity;

        let HTMLText = `
        <h4>${currentDate}</h4><br>
        <h4 id="is-clear">${isClear}</h4><br>
        <ul>Temp: ${temperature}°F</ul>
        <ul>Wind Speed: ${windSpeed} MPH</ul>
        <ul>Humidity: ${humidity}%</ul>`;
        // let HTMLHeader = `
        // <h3>Five Day Weather Forecast for ${name}</h3>`;
        // let cardHeader = document.createElement("div");
        // cardHeader.innerHTML = HTMLHeader;
        let weatherCard = document.createElement("div");
        weatherCard.id = "weather-card";
        weatherCard.innerHTML = HTMLText;

        // document.body.appendChild(cardHeader);
        document.body.appendChild(weatherCard);
      }
    });
};

const createPreviousSearch = () => {
  // Function to create elements from localStorage on page load
  for (let i = 0; i < savedCities.length; i++) {
    let HTMLText = `
      The weather in ${savedCities[i]} is nice!`; // Placeholder text, replace with creating saved search buttons
    let paragraphEl = document.createElement("p");
    paragraphEl.innerText = HTMLText;
    document.body.appendChild(paragraphEl);
  }
};

if (savedCities) {
  // Load localStorage if it exists on page load
  createPreviousSearch();
}
searchButton.addEventListener("click", searchCity);
