const weatherText = document.getElementById("weather-txt");
const searchButton = document.getElementById("search-button");

const searchCity = (e) => {
  e.preventDefault();
  const cityList = JSON.parse(localStorage.getItem("city-list")); // Loads localStorage as an array
  let inputText = weatherText.value; // Saving value to let allows re-execution of function
  weatherText.value = ""; // Clears input field
  cityList.push(inputText);
  localStorage.setItem("city-list", JSON.stringify(cityList));
  // Then execute function to create p elements from localStorage

  let HTMLText = `
  The weather in ${inputText} is nice!`; // Placeholder text, replace with creating saved search buttons
  let paragraphEl = document.createElement("p"); // Turn this element creation into a for loop
  paragraphEl.innerText = HTMLText;
  document.body.appendChild(paragraphEl);
};

searchButton.addEventListener("click", searchCity);
