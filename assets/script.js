const searchText = document.getElementById("weather-txt");
const searchButton = document.getElementById("search-button");
const savedCities = JSON.parse(localStorage.getItem("city-list"));
let cityList = [];

const searchCity = (e) => {
  // Function to search API for the user inputted city.
  e.preventDefault();
  // const cityList = JSON.parse(localStorage.getItem("city-list")); // Loads localStorage as an array
  const inputText = searchText.value; // Saving value to let allows re-execution of function
  cityList.push(inputText);
  localStorage.setItem("city-list", JSON.stringify(cityList));
  searchText.value = "";

  // Create new elements based on user input
  let HTMLText = `
    The weather in ${inputText} is nice!`;
  let paragraphEl = document.createElement("p");
  paragraphEl.innerText = HTMLText;
  document.body.appendChild(paragraphEl);
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
