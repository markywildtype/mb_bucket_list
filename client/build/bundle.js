/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const app = function(){

const request = new XMLHttpRequest();
request.open('GET', "https://restcountries.eu/rest/v2/all");
request.addEventListener('load', function(){
  const jsonString = this.responseText;
  localStorage.setItem('all countries', jsonString);

  const countries = JSON.parse(jsonString)

  populateSubRegionList(countries)

  const dropdownSR = document.getElementById('options');
  dropdownSR.addEventListener('change', onSRChange);

  const dropdownCountries = document.getElementById('countries');
  dropdownCountries.addEventListener('change', onCountriesChange);

  const addButton = document.getElementById('button');
  button.addEventListener('click', onButtonClick);

});
request.send();
}


//Dropdown 1:
const populateSubRegionList = function(array){
  subregionArray = [];
  array.forEach(function(item){
    if(!subregionArray.includes(item.subregion) && item.subregion !== ""){
    subregionArray.push(item.subregion);
  }
  });
  fillDropdown(subregionArray.sort(), 'options');
}

//Dropdown 2:
const onSRChange = function(){
  const countryDropdown = document.getElementById('countries');
  countryDropdown.style.display = "block";
  const countryLabel = document.getElementById('country-label');
  countryLabel.style.display = "block";
  const countriesJson = localStorage.getItem('all countries');
  const countries = JSON.parse(countriesJson);
  const countryArray = [];
  const subRegion = this.value;
  countries.forEach(function(country){
    if(country.subregion === subRegion){
      countryArray.push(country.name);
    }
  });
  fillDropdown(countryArray, 'countries');
}

const onCountriesChange = function(){
  getCountryDetails(this.value);
}

//Filling dropdowns
const fillDropdown = function(array, parentId){
  const dropdown = document.getElementById(parentId);
  dropdown.innerHTML = "<option selected disabled>Choose:</option>";
  array.forEach(function(item){
    const option = document.createElement('option');
    option.innerText = item;
    option.value = item;
    dropdown.appendChild(option);
  });
}

//Populate country details page:
const getCountryDetails = function(value){
  const countriesJson = localStorage.getItem('all countries');
  const countries = JSON.parse(countriesJson);
  countries.forEach(function(country){
    if(country.name === value){
      renderCountryDetails(country);
    }
  });
}

const renderCountryDetails = function(country){
  const article = document.getElementById('country-details');
  article.innerText = "";
  addElement('country-details', 'p', country.name);
  addImage('country-details', 'p', country.flag);
  addElement('country-details', 'p', "Capital: " + country.capital)
  addElement('country-details', 'p', "Currency: " + country.currencies[0].name)
  addElement('country-details', 'p', "Population: " + country.population);
  const button = document.getElementById('button');
  button.style.display = 'inline-block';
  button.value = country.name;

}

//Button function:
const onButtonClick = function(){
  console.log(this.value);
}

//Helper functions:
const addElement = function(parentId, childTag, text){
  const parent = document.getElementById(parentId);
  const child = document.createElement(childTag);
  child.innerText = text;
  parent.appendChild(child);
}

const addImage = function(parentId, childTag, url){
  const parent = document.getElementById(parentId);
  const child = document.createElement(childTag);
  child.innerHTML = '<img src="' + url + '" alt="national flag" width="250px" height="150px"/>';
  parent.appendChild(child);
}


document.addEventListener('DOMContentLoaded', app);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map