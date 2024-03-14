const weatherText = document.getElementById("weather-txt");
const searchButton = document.getElementById("search-button");

const searchCity = (e) => {
  // Function to search API for the user inputted city.
  e.preventDefault();
  const cityList = JSON.parse(localStorage.getItem("city-list")); // Loads localStorage as an array
  const inputText = weatherText.value; // Saving value to let allows re-execution of function
  weatherText.value = "";
  cityList.push(inputText);
  localStorage.setItem("city-list", JSON.stringify(cityList));

  // Create new elements based on user input
  let HTMLText = `
    The weather in ${inputText} is nice!`;
  let paragraphEl = document.createElement("p");
  paragraphEl.innerText = HTMLText;
  document.body.appendChild(paragraphEl);
};

const createPreviousSearch = () => {
  // Function to create elements from localStorage on page load
  const cityList = JSON.parse(localStorage.getItem("city-list"));

  for (let i = 0; i < cityList.length; i++) {
    let HTMLText = `
      The weather in ${cityList[i]} is nice!`; // Placeholder text, replace with creating saved search buttons
    let paragraphEl = document.createElement("p");
    paragraphEl.innerText = HTMLText;
    document.body.appendChild(paragraphEl);
  }
};

createPreviousSearch();
searchButton.addEventListener("click", searchCity);
