import formatHighlight from "json-format-highlight";
import { debounce } from "./utils";

const countrySelectInput = document.getElementById("country-selector-input");
const langCountrySelectInput = document.getElementById(
  "lang-country-selector-input"
);
const langSelectInput = document.getElementById("lang-selector-input");
const resizeCheckBox = document.getElementById("resize-checkbox");
const resizeCheckboxWidth = document.getElementById("resize-checkbox-width");
const resizeCheckboxHeight = document.getElementById("resize-checkbox-height");
const langCheckbox = document.getElementById("lang-checkbox");
const langCheckboxWidth = document.getElementById("lang-resize-width");
const langCheckboxHeight = document.getElementById("lang-resize-height");
const phoneCheckbox = document.getElementById("phone-checkbox");
const phoneCheckboxWidth = document.getElementById("phone-width-checkbox");
const phoneCheckboxHeight = document.getElementById("phone-height-checkbox");
const phoneInput = document.getElementById("phone-input");
const flagImg = document.getElementById("flag-img");
const langFlagImg = document.getElementById("lang-flag-img");
const phoneImg = document.getElementById("phone-img");
const pngBtn = document.getElementById("png-btn");
const svgBtn = document.getElementById("svg-btn");
const pngLangBtn = document.getElementById("png-lang-btn");
const svgLangBtn = document.getElementById("svg-lang-btn");
const pngPhoneBtn = document.getElementById("png-phone-btn");
const svgPhoneBtn = document.getElementById("svg-phone-btn");
const resizeCheck = document.getElementById("resize-check");
const resizeWidth = document.getElementById("width");
const resizeHeight = document.getElementById("height");
const langResizeCheck = document.getElementById("lang-resize-check");
const phoneResizeCheck = document.getElementById("phone-resize-check");
const langResizeWidth = document.getElementById("lang-width");
const langResizeHeight = document.getElementById("lang-height");
const phoneResizeWidth = document.getElementById("phone-width");
const phoneResizeHeight = document.getElementById("phone-height");
const prettyData = document.getElementById("pretty-data");
const langPrettyData = document.getElementById("lang-pretty-data");
const phonePrettyData = document.getElementById("phone-pretty-data");
const dropBtn = document.getElementById("drop-btn");
const dropdown = document.getElementById("dropdown");
const AssetsArrow = document.getElementById("assets-arrow");
const url = document.getElementById("url");
const countryCode = document.getElementById("country-code");
const flagSize = document.getElementById("flag-size");
const imgType = document.getElementById("img-type");
const langUrl = document.getElementById("lang-url");
const langCountryCode = document.getElementById("lang-country-code");
const langFlagSize = document.getElementById("lang-flag-size");
const phoneUrl = document.getElementById("phone-url");
const phoneCountryCode = document.getElementById("phone-country-code");
const phoneFlagSize = document.getElementById("phone-flag-size");
const langImgType = document.getElementById("lang-img-type");
const phoneImgType = document.getElementById("phone-img-type");
const langCountrySelector = document.getElementById("lang-country-selector");
const countryList = document.getElementById("country-list");
const languageList = document.getElementById("lang-list");

let fetchedCountries = [];
let fetchedLanguage = [];

(function fetchingLanguages() {
  fetch(`http://geo.wordplex.io/v4/langs`)
    .then((res) => res.json())
    .then(({ items }) => {
      fetchedLanguage = items;
    })
    .finally(() => {
      fillLanguageList(fetchedLanguage);
    });
})();

function fillLanguageList(list) {
  languageList.innerHTML = "";

  list.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = item.name;
    listItem.setAttribute("data-value", item.iso_2);
    listItem.addEventListener("click", changeLangFlagHandler);
    listItem.tabIndex = 0;
    languageList.appendChild(listItem);
  });
}

(function fetchingCountries() {
  fetch(`http://geo.wordplex.io/v4/countries`)
    .then((res) => res.json())
    .then(({ items }) => {
      fetchedCountries = items;
    })
    .finally(() => {
      fillCountryList(fetchedCountries);
    });
})();

function fillCountryList(list) {
  countryList.innerHTML = "";

  list.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = item.name;
    listItem.setAttribute("data-value", item.alpha2Code);
    listItem.addEventListener("click", changeIsoFlagHandler);
    listItem.tabIndex = 0;
    countryList.appendChild(listItem);
  });
}

function getSelectedCountry(selectedCountryCode) {
  const selectedCountry = fetchedCountries.find(
    (fetchedCountry) => fetchedCountry.alpha2Code === selectedCountryCode
  );

  return selectedCountry;
}

function getSelectedCountryByLang(selectedCountryCode) {
  const selectedCountry = fetchedLanguage.find(
    (fetchedCountry) => fetchedCountry.name === selectedCountryCode
  );
  console.log(selectedCountry);
  return countryValue;
}

function generateHtmlImgTag(isoValue, countryName, widthValue, heightValue) {
  const defaultWidthValue = 200;

  const currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;

  const currentHeightValue = heightValue ? `x${heightValue}` : "";

  return `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-${currentWidthValue}${currentHeightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-${currentWidthValue}${currentHeightValue}.png 2x"
      width="${currentWidthValue}"   
      height="${!!heightValue ? heightValue : "auto"}"
      alt="${countryName} flag">`;
}

function langHtmlImgTag(widthValue, heightValue, langName, countryValue) {
  const defaultWidthValue = 200;
  const currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;
  const currentHeightValue = !!heightValue ? `x${heightValue}` : "";

  return `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-${currentWidthValue}${currentHeightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-${currentWidthValue}${currentHeightValue}.png 2x"
      width="${currentWidthValue}"   
      height="${!!heightValue ? heightValue : "auto"}"
      alt="${langName} language">`;
}

function phoneHtmlImgTag(widthValue, heightValue, phoneNumber) {
  const defaultWidthValue = 200;
  const currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;
  const currentHeightValue = !!heightValue ? `x${heightValue}` : "";

  return `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-${currentWidthValue}${currentHeightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-${currentWidthValue}${currentHeightValue}.png 2x"
      width="${currentWidthValue}"   
      height="${!!heightValue ? heightValue : "auto"}"
      alt="">`;
}

function openCountryListHandler() {
  countryList.style.display = "block";
}

function changeCountryInputHandler(event) {
  openCountryListHandler();

  const filteredCountries = fetchedCountries.filter((country) =>
    country.name.toLowerCase().includes(event.target.value.toLowerCase())
  );

  fillCountryList(filteredCountries);
}

function closeLangList() {
  languageList.style.display = "none";
}

function openLangListHandler() {
  languageList.style.display = "block";
}

function changeLangInputHandler(event) {
  openLangListHandler();

  const filteredlanguages = fetchedLanguage.filter((language) =>
    language.name.toLowerCase().includes(event.target.value.toLowerCase())
  );

  fillLanguageList(filteredlanguages);
}

function changeIsoFlagHandler(event) {
  const isoValue = event.target.dataset.value;
  const widthValue = resizeWidth.value;
  const heightValue = resizeHeight.value;
  const countryName = getSelectedCountry(isoValue)?.name;

  countryList.style.display = "none";

  fillCountryList(fetchedCountries);

  countrySelectInput.value = countryName;

  const imageURL = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}/fr-75x50.png`;
  const highlightOptions = {
    stringColor: "#005CCD",
  };

  const imgCode = generateHtmlImgTag(
    isoValue,
    countryName,
    widthValue,
    heightValue
  );

  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  url.innerHTML = `https://wordplex.cloudimg.io/v7w/flag/country/`;
  countryCode.innerHTML = `${isoValue}`;
  prettyData.innerHTML = coloredJsonData;
  flagImg.src = imageURL;
}

function changeLangFlagHandler(event) {
  const langName = event.target.innerHTML;
  const widthValue = langResizeWidth.value;
  const heightValue = langResizeHeight.value;
  const countryValue = event.target.dataset.value;
  const imageURL = `https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}-75x50.png`;
  const highlightOptions = {
    stringColor: "#005CCD",
  };

  const imgCode = langHtmlImgTag(
    widthValue,
    heightValue,
    langName,
    countryValue
  );

  langSelectInput.value = langName;

  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  langPrettyData.innerHTML = coloredJsonData;
  langFlagImg.src = imageURL;
  langUrl.innerHTML = `https://wordplex.cloudimg.io/v7w/flag/country/`;
  langCountryCode.innerHTML = `${countryValue}`;
}

function changePhoneFlagHandler() {
  const phoneNumber = phoneInput.value;
  const widthValue = phoneResizeWidth.value;
  const heightValue = phoneResizeHeight.value;
  const imgURL = `https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-75x50.png`;

  const highlightOptions = {
    stringColor: "#005CCD",
  };

  const imgCode = phoneHtmlImgTag(widthValue, heightValue, phoneNumber);
  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  phonePrettyData.innerHTML = coloredJsonData;
  phoneCountryCode.innerHTML = `${phoneNumber}`;
  phoneImg.src = imgURL;
}

function changePngHandler() {
  imgType.innerHTML = `png`;
  svgBtn.style.backgroundColor = "#FFFF";
  pngBtn.style.backgroundColor = "#DFEEFF";
  resizeCheckBox.style.display = "block";
  resizeCheckboxWidth.style.display = "block";
  resizeCheckboxHeight.style.display = "block";

  changeWidthHandler();
}

function changeSvgHandler() {
  const isoValue = getSelectedCountry().alpha2Code;
  const countryName = getSelectedCountry().name;
  const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-200.svg"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-400.svg 2x"
      width="auto"   
      height="auto"
      alt="${countryName} flag">`;

  const highlightOptions = {
    stringColor: "#005CCD",
  };

  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  imgType.innerHTML = `svg`;
  svgBtn.style.backgroundColor = "#DFEEFF";
  pngBtn.style.backgroundColor = "#FFFF";
  resizeCheckBox.style.display = "none";
  resizeCheckboxWidth.style.display = "none";
  resizeCheckboxHeight.style.display = "none";
  countryCode.innerHTML = `${isoValue}`;
  flagSize.innerHTML = `400x240`;
  prettyData.innerHTML = coloredJsonData;
  countryCode.innerHTML = `${isoValue}`;
}

function changeLangPngHandler() {
  langImgType.innerHTML = `png`;
  svgLangBtn.style.backgroundColor = "#FFFF";
  pngLangBtn.style.backgroundColor = "#DFEEFF";
  langCheckbox.style.display = "block";
  langCheckboxWidth.style.display = "block";
  langCheckboxHeight.style.display = "block";

  langChangeWidthHandler();
}

function changeLangSvgHandler() {
  const langName = langCountrySelectInput.value;
  const countryValue = getSelectedCountryByLang().iso_2;
  const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}-200.svg"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}-400.svg 2x"
      width="auto"   
      height="auto"
      alt="${langName} flag">`;

  const highlightOptions = {
    stringColor: "#005CCD",
  };

  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  langPrettyData.innerHTML = coloredJsonData;
  langCountryCode.innerHTML = `${countryValue}`;
  langImgType.innerHTML = `svg`;
  svgLangBtn.style.backgroundColor = "#DFEEFF";
  pngLangBtn.style.backgroundColor = "#FFFF";
  langCheckbox.style.display = "none";
  langCheckboxWidth.style.display = "none";
  langCheckboxHeight.style.display = "none";
  langCountryCode.innerHTML = `${countryValue}`;
  langFlagSize.innerHTML = `400x240`;
}

function changePhonePngHandler() {
  phoneImgType.innerHTML = `png`;
  svgPhoneBtn.style.backgroundColor = "#FFFF";
  pngPhoneBtn.style.backgroundColor = "#DFEEFF";
  phoneCheckbox.style.display = "block";
  phoneCheckboxWidth.style.display = "block";
  phoneCheckboxHeight.style.display = "block";

  changePhoneFlagHandler();
}

function changePhoneSvgHandler() {
  const phoneNumber = phoneInput.value;
  const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-200.svg"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-400.svg 2x"
      width="auto"   
      height="auto"
      alt="${phoneNumber} flag">`;

  const highlightOptions = {
    stringColor: "#005CCD",
  };

  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  phoneImgType.innerHTML = `svg`;
  svgPhoneBtn.style.backgroundColor = "#DFEEFF";
  pngPhoneBtn.style.backgroundColor = "#FFFF";
  phoneCheckbox.style.display = "none";
  phoneCheckboxWidth.style.display = "none";
  phoneCheckboxHeight.style.display = "none";
  phoneCountryCode.innerHTML = `${phoneNumber}`;
  phoneFlagSize.innerHTML = `400x240`;
  phonePrettyData.innerHTML = coloredJsonData;
  phoneCountryCode.innerHTML = `${phoneNumber}`;
}

function resizeChecked() {
  if (resizeCheck.checked == true) {
    resizeWidth.disabled = false;
    resizeHeight.disabled = false;
  } else {
    resizeWidth.disabled = true;
    resizeHeight.disabled = true;
  }
}

function langResizeChecked() {
  if (langResizeCheck.checked == true) {
    langResizeWidth.disabled = false;
    langResizeHeight.disabled = false;
  } else {
    langResizeWidth.disabled = true;
    langResizeHeight.disabled = true;
  }
}

function phoneResizeChecked() {
  if (phoneResizeCheck.checked == true) {
    phoneResizeWidth.disabled = false;
    phoneResizeHeight.disabled = false;
  } else {
    phoneResizeWidth.disabled = true;
    phoneResizeHeight.disabled = true;
  }
}

function dropdownFunction(event) {
  event.stopPropagation();
  dropdown.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropBtn")) {
    let dropdowns = document.getElementsByClassName("drop-down-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function keyDown(event) {
  if (event.keyCode === 27) {
    countryList.style.display = "none";
    languageList.style.display = "none";
  }
}

function closeDropdownHandler(event) {
  if (event.target != countryList || event.target != languageList) {
    countryList.style.display = "none";
    languageList.style.display = "none";
  }
}

function changeWidthHandler() {
  const widthValue = resizeWidth.value;
  const heightValue = resizeHeight.value;
  const defaultWidthValue = 200;

  const currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;

  const currentHeightValue = heightValue ? `x${heightValue}` : "";

  flagSize.innerHTML = `${currentWidthValue}${currentHeightValue}`;
}

function langChangeWidthHandler() {
  const widthValue = langResizeWidth.value;
  const heightValue = langResizeHeight.value;
  const defaultWidthValue = 200;

  const currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;

  const currentHeightValue = heightValue ? `x${heightValue}` : "";

  changeLangFlagHandler();

  langFlagSize.innerHTML = `${currentWidthValue}${currentHeightValue}`;
}

function phoneChangeWidthHandler() {
  const widthValue = phoneResizeWidth.value;
  const heightValue = phoneResizeHeight.value;
  const defaultWidthValue = 200;

  const currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;

  const currentHeightValue = heightValue ? `x${heightValue}` : "";

  changePhoneFlagHandler();

  phoneFlagSize.innerHTML = `${currentWidthValue}${currentHeightValue}`;
}

window.addEventListener("mouseup", closeDropdownHandler);
window.addEventListener("keydown", keyDown);
languageList.addEventListener("click", closeLangList);
langSelectInput.addEventListener("keydown", changeLangInputHandler);
langSelectInput.addEventListener("click", openLangListHandler);
countrySelectInput.addEventListener("keydown", changeCountryInputHandler);
countrySelectInput.addEventListener("click", openCountryListHandler);
phoneInput.addEventListener("keydown", debounce(changePhoneFlagHandler, 800));
pngBtn.addEventListener("click", changePngHandler);
svgBtn.addEventListener("click", debounce(changeSvgHandler, 350));
pngPhoneBtn.addEventListener("click", changePhonePngHandler);
svgPhoneBtn.addEventListener("click", changePhoneSvgHandler);
pngLangBtn.addEventListener("click", changeLangPngHandler);
svgLangBtn.addEventListener("click", changeLangSvgHandler);
resizeCheck.addEventListener("click", resizeChecked);
resizeWidth.addEventListener("keydown", debounce(changeWidthHandler, 350));
resizeHeight.addEventListener("keydown", debounce(changeWidthHandler, 300));
langResizeCheck.addEventListener("click", langResizeChecked);
phoneResizeCheck.addEventListener("click", phoneResizeChecked);
langResizeWidth.addEventListener(
  "keydown",
  debounce(langChangeWidthHandler, 350)
);
langResizeHeight.addEventListener(
  "keydown",
  debounce(langChangeWidthHandler, 350)
);
phoneResizeWidth.addEventListener(
  "keydown",
  debounce(phoneChangeWidthHandler, 300)
);
phoneResizeHeight.addEventListener(
  "keydown",
  debounce(phoneChangeWidthHandler, 300)
);
dropBtn.addEventListener("click", dropdownFunction);
AssetsArrow.addEventListener("click", dropdownFunction);
