const weatherText = document.getElementById("weather-txt");
const searchButton = document.getElementById("search-button");
const cityList = [];

const searchCity = (input) => {
  //e.preventDefault();
  //const setCity = localStorage.setItem("city-list", cityList.push(input));
  let inputText = weatherText.value;
  let HTMLText = `
    The weather in ${inputText} is nice!`;
  let paragraphEl = document.createElement("p"); // Turn this element creation into a for loop
  paragraphEl.innerText = HTMLText;
  document.body.appendChild(paragraphEl);
  weatherText.value = "";
};

searchButton.addEventListener("click", searchCity(weatherText.value));
