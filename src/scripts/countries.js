import formatHighlight from "json-format-highlight";
import { debounce } from "./utils";
import autocomplete from "autocompleter";

const countrySelectInput = document.getElementById("country-selector-input");
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
const phoneCountryCode = document.getElementById("phone-country-code");
const phoneFlagSize = document.getElementById("phone-flag-size");
const langImgType = document.getElementById("lang-img-type");
const phoneImgType = document.getElementById("phone-img-type");
const inputCloseMark = document.getElementById("input-close-mark");
const langInputCloseMark = document.getElementById("lang-input-close-mark");
const phoneInputCloseMark = document.getElementById("phone-input-close-mark");

let selectedLanguage = {};
let selectedCountry = {};
let isSelectedCountry = false;
let isSelectedLanguage = false;

(function fetchingLanguages() {
  fetch(`http://geo.wordplex.io/v4/langs`)
    .then((res) => res.json())
    .then(({ items }) => {
      autocomplete({
        input: langSelectInput,
        fetch: function (text, update) {
          langSelectInput.value
            ? (langInputCloseMark.style.display = "block")
            : (langInputCloseMark.style.display = "none");

          text = text.toLowerCase();
          const suggestions = items
            .filter((n) =>
              isSelectedLanguage ? true : n.name.toLowerCase().startsWith(text)
            )
            .map((item) => ({ label: item.name, value: item.iso_2 }));
          update(suggestions);
        },
        showOnFocus: true,
        minLength: 0,
        emptyMsg: "No options",
        onSelect: function (item) {
          langInputCloseMark.style.display = "block";
          isSelectedLanguage = true;
          langSelectInput.value = item.label;

          langSelectInput.blur();

          changeLangFlagHandler(item.label, item.value);

          selectedLanguage = item;
        },
      });
    });
})();

(function fetchingCountries() {
  fetch(`http://geo.wordplex.io/v4/countries`)
    .then((res) => res.json())
    .then(({ items }) => {
      autocomplete({
        input: countrySelectInput,
        fetch: function (text, update) {
          countrySelectInput.value
            ? (inputCloseMark.style.display = "block")
            : (inputCloseMark.style.display = "none");
          text = text.toLowerCase();
          var suggestions = items
            .filter((n) =>
              isSelectedCountry ? true : n.name.toLowerCase().startsWith(text)
            )
            .map((item) => ({ label: item.name, value: item.alpha2Code }));

          update(suggestions);
        },
        showOnFocus: true,
        minLength: 0,
        emptyMsg: "No options",
        onSelect: function (item) {
          inputCloseMark.style.display = "block";
          isSelectedCountry = true;
          countrySelectInput.value = item.label;

          countrySelectInput.blur();
          changeIsoFlagHandler(item.value, item.label);

          selectedCountry = item;
        },
      });
    });
})();

function generatePngHtmlImgTag(
  isoValue,
  countryName,
  widthValue,
  heightValue,
  imgType = "png"
) {
  const defaultWidthValue = 200;

  let currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;

  const currentHeightValue = heightValue ? `x${heightValue}` : "";

  let src = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-${currentWidthValue}${currentHeightValue}.${imgType}`;
  let srcSet = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-${currentWidthValue}${currentHeightValue}.${imgType} 2x`;

  if (imgType === "svg") {
    currentWidthValue = "auto";
    src = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}.${imgType}`;
    srcSet = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}.${imgType} 2x`;
  }

  return `&lt; img 
      src="${src}"
      srcset= "${srcSet}"
      width="${currentWidthValue}"   
      height="${!!heightValue ? heightValue : "auto"}"
      alt="${countryName} flag">`;
}

function langHtmlImgTag(
  widthValue,
  heightValue,
  langName,
  countryValue,
  imgType = "png"
) {
  const defaultWidthValue = 200;
  let currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;
  const currentHeightValue = !!heightValue ? `x${heightValue}` : "";

  let src = `https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}-${currentWidthValue}${currentHeightValue}.${imgType}`;

  let srcSet = `https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}-${currentWidthValue}${currentHeightValue}.${imgType} 2x`;

  if (imgType === "svg") {
    currentWidthValue = "auto";
    src = `https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}.${imgType}`;
    srcSet = `https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}.${imgType} 2x`;
  }

  return `&lt; img 
      src= "${src}"
      srcset= "${srcSet}"
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

function clearInput() {
  countrySelectInput.value = "";
  inputCloseMark.style.display = "none";
}

function clearLangInput() {
  langSelectInput.value = "";
  langInputCloseMark.style.display = "none";
}

function clearPhoneInput() {
  phoneInput.value = "";
  phoneInputCloseMark.style.display = "none";
}

// country iso event handler
function changeIsoFlagHandler(isoValue, countryName) {
  const imageURL = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}/fr-75x50.png`;
  const highlightOptions = {
    stringColor: "#005CCD",
  };

  const imgCode = generatePngHtmlImgTag(isoValue, countryName);

  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  url.innerHTML = `https://wordplex.cloudimg.io/v7w/flag/country/`;
  countryCode.innerHTML = `${isoValue}`;
  prettyData.innerHTML = coloredJsonData;
  flagImg.src = imageURL;
}

function changeWidthHandler() {
  const widthValue = resizeWidth.value;
  const heightValue = resizeHeight.value;
  const defaultWidthValue = 200;

  const currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;
  const currentHeightValue = heightValue ? `x${heightValue}` : "";
  const highlightOptions = { stringColor: "#005CCD" };

  const countryValue = selectedCountry.value;
  const countryName = selectedCountry.label;

  const imgCode = generatePngHtmlImgTag(
    countryValue,
    countryName,
    widthValue,
    heightValue
  );

  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  prettyData.innerHTML = coloredJsonData;

  flagSize.innerHTML = `${currentWidthValue}${currentHeightValue}`;
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
  const countryValue = selectedCountry.value;
  const countryName = selectedCountry.label;

  const imgCode = generatePngHtmlImgTag(
    countryValue,
    countryName,
    null,
    null,
    "svg"
  );

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
  countryCode.innerHTML = `${countryValue}`;
  flagSize.innerHTML = `200`;
  prettyData.innerHTML = coloredJsonData;
  countryCode.innerHTML = `${countryValue}`;
}

function changeCountryInputHandler(event) {
  isSelectedCountry = false;
}

function focusCountryInputHandler(event) {
  countrySelectInput.select();
}

// language event handler
function changeLangFlagHandler(langName, countryValue) {
  const widthValue = langResizeWidth.value;
  const heightValue = langResizeHeight.value;

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

  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  langPrettyData.innerHTML = coloredJsonData;
  langFlagImg.src = imageURL;
  langUrl.innerHTML = `https://wordplex.cloudimg.io/v7w/flag/lang/`;
  langCountryCode.innerHTML = `${countryValue}`;
}

function langChangeWidthHandler() {
  const widthValue = langResizeWidth.value;
  const heightValue = langResizeHeight.value;
  const defaultWidthValue = 200;

  const currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;
  const currentHeightValue = !!heightValue ? `x${heightValue}` : "";

  const langName = selectedLanguage.label;
  const langValue = selectedLanguage.value;

  const highlightOptions = { stringColor: "#005CCD" };

  const imgCode = langHtmlImgTag(widthValue, heightValue, langName, langValue);
  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  langPrettyData.innerHTML = coloredJsonData;

  langFlagSize.innerHTML = `${currentWidthValue}${currentHeightValue}`;
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
  const langName = selectedLanguage.label;
  const langValue = selectedLanguage.value;

  const imgCode = langHtmlImgTag(null, null, langName, langValue, "svg");

  const highlightOptions = {
    stringColor: "#005CCD",
  };

  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  langPrettyData.innerHTML = coloredJsonData;
  langCountryCode.innerHTML = `${langValue}`;
  langImgType.innerHTML = `svg`;
  svgLangBtn.style.backgroundColor = "#DFEEFF";
  pngLangBtn.style.backgroundColor = "#FFFF";
  langCheckbox.style.display = "none";
  langCheckboxWidth.style.display = "none";
  langCheckboxHeight.style.display = "none";
  langCountryCode.innerHTML = `${langValue}`;
  langFlagSize.innerHTML = `400x240`;
}

function changeLangInputHandler(event) {
  isSelectedLanguage = false;
}

function focusLangInputHandler(event) {
  langSelectInput.select();
}

// phone event handler
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

function phoneChangeWidthHandler() {
  const widthValue = phoneResizeWidth.value;
  const heightValue = phoneResizeHeight.value;
  const defaultWidthValue = 200;

  const currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;

  const currentHeightValue = heightValue ? `x${heightValue}` : "";

  changePhoneFlagHandler();

  phoneFlagSize.innerHTML = `${currentWidthValue}${currentHeightValue}`;
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

function openPhoneXMarkHandler() {
  phoneInputCloseMark.style.display = "block";
}

//country Iso attach events
countrySelectInput.addEventListener("focus", focusCountryInputHandler);
countrySelectInput.addEventListener("keydown", changeCountryInputHandler);
pngBtn.addEventListener("click", changePngHandler);
svgBtn.addEventListener("click", debounce(changeSvgHandler, 350));
resizeCheck.addEventListener("click", resizeChecked);
resizeWidth.addEventListener("keydown", debounce(changeWidthHandler, 350));
resizeHeight.addEventListener("keydown", debounce(changeWidthHandler, 300));
dropBtn.addEventListener("click", dropdownFunction);
AssetsArrow.addEventListener("click", dropdownFunction);
inputCloseMark.addEventListener("click", clearInput);

//language attach events
langSelectInput.addEventListener("focus", focusLangInputHandler);
langSelectInput.addEventListener("keydown", changeLangInputHandler);
pngLangBtn.addEventListener("click", changeLangPngHandler);
svgLangBtn.addEventListener("click", changeLangSvgHandler);
langResizeCheck.addEventListener("click", langResizeChecked);
langInputCloseMark.addEventListener("click", clearLangInput);
langResizeWidth.addEventListener(
  "keydown",
  debounce((event) => langChangeWidthHandler(event, "width")),
  100
);
langResizeHeight.addEventListener(
  "keydown",
  debounce((event) => langChangeWidthHandler(event, "height"), 100)
);

//phone attach events
phoneResizeCheck.addEventListener("click", phoneResizeChecked);
phoneInput.addEventListener("keydown", debounce(changePhoneFlagHandler, 800));
phoneInput.addEventListener("click", openPhoneXMarkHandler);
pngPhoneBtn.addEventListener("click", changePhonePngHandler);
svgPhoneBtn.addEventListener("click", changePhoneSvgHandler);
phoneResizeWidth.addEventListener(
  "keydown",
  debounce(phoneChangeWidthHandler, 300)
);
phoneResizeHeight.addEventListener(
  "keydown",
  debounce(phoneChangeWidthHandler, 300)
);

phoneInputCloseMark.addEventListener("click", clearPhoneInput);
