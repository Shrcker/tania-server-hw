const weatherText = document.getElementById("weather-txt");
const searchButton = document.getElementById("search-button");

const searchCity = (e) => {
  let inputText = weatherText.value;
  e.preventDefault();
  let HTMLText = `
      The weather in ${inputText} is nice!`;
  let paragraphEl = document.createElement("p");
  paragraphEl.innerText = HTMLText;
  document.body.appendChild(paragraphEl);
  weatherText.value = "";
};

searchButton.addEventListener("click", searchCity);
