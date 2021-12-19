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
const backDrop = document.getElementById("backdrop");
const mobileNavbar = document.getElementById("mobile-navbar");
const burgerBtn = document.getElementById("burger-btn");
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
const isoArrowIcon = document.getElementById("iso-arrow-icon");
const langArrowIcon = document.getElementById("lang-arrow-icon");

let selectedLanguage = {};
let selectedCountry = {};
let isSelectedCountry = true;
let isSelectedLanguage = true;
let isCountryListOpen = false;
let isLangListOpen = false;

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

          changeIsoFlagHandler(item.label, item.value);

          selectedCountry = item;
        },
      });
    });
})();

function generatePngHtmlImgTag(
  widthValue,
  heightValue,
  countryName,
  countryValue,
  imgType = "png"
) {
  const defaultWidthValue = 200;

  const defaultCountryValue = "France";

  let currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;

  const currentHeightValue = heightValue ? `x${heightValue}` : "";

  let src = `https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-${currentWidthValue}${currentHeightValue}.${imgType}`;
  let srcSet = `https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-${currentWidthValue}${currentHeightValue}.${imgType} 2x`;

  if (imgType === "svg") {
    currentWidthValue = "auto";
    src = `https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}.${imgType}`;
    srcSet = `https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}.${imgType} 2x`;

    if (countrySelectInput.value === defaultCountryValue) {
      currentWidthValue = "200";
      src = `https://wordplex.cloudimg.io/v7w/flag/country/FR.${imgType}`;
      srcSet = `https://wordplex.cloudimg.io/v7w/flag/country/FR.${imgType} 2x`;
    }
  }

  if (countrySelectInput.value === defaultCountryValue) {
    src = `https://wordplex.cloudimg.io/v7w/flag/country/FR-${currentWidthValue}${currentHeightValue}.${imgType}`;
    srcSet = `https://wordplex.cloudimg.io/v7w/flag/country/FR-${currentWidthValue}${currentHeightValue}.${imgType} 2x`;
    countryName = `France`;
  }

  return `&lt;img 
  src="${src}"
  srcset="${srcSet}"
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
  let defaultCountryValue = "French";
  const defaultWidthValue = 200;
  let currentWidthValue = !!widthValue ? widthValue : defaultWidthValue;
  const currentHeightValue = !!heightValue ? `x${heightValue}` : "";

  let src = `https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}-${currentWidthValue}${currentHeightValue}.${imgType}`;

  let srcSet = `https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}-${currentWidthValue}${currentHeightValue}.${imgType} 2x`;

  if (imgType === "svg") {
    currentWidthValue = "auto";
    src = `https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}.${imgType}`;
    srcSet = `https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}.${imgType} 2x`;

    if (langSelectInput.value === defaultCountryValue) {
      currentWidthValue = "200";
      src = `https://wordplex.cloudimg.io/v7w/flag/lang/fr.${imgType}`;
      srcSet = `https://wordplex.cloudimg.io/v7w/flag/lang/fr.${imgType} 2x`;
    }
  }

  if (langSelectInput.value === defaultCountryValue) {
    src = `https://wordplex.cloudimg.io/v7w/flag/lang/fr-${currentWidthValue}${currentHeightValue}.${imgType}`;
    srcSet = `https://wordplex.cloudimg.io/v7w/flag/lang/fr-${currentWidthValue}${currentHeightValue}.${imgType} 2x`;
    langName = `French`;
  }

  return `&lt;img 
  src="${src}"
  srcset="${srcSet}"
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

function toggleMobileNavbar() {
  if (!mobileNavbar.offsetWidth) {
    mobileNavbar.style.display = "flex";
    backDrop.style.display = "flex";
  } else {
    mobileNavbar.style.display = "none";
    backDrop.style.display = "none";
  }
}

function keydown(event) {
  if (event.keyCode === 27) {
    mobileNavbar.style.display = "none";

    isoArrowIcon.style.transform = "rotate(0deg)";
    langArrowIcon.style.transform = "rotate(0deg)";
  }
}

// country iso event handler
function changeIsoFlagHandler(countryName, isoValue) {
  const widthValue = resizeWidth.value;
  const heightValue = resizeHeight.value;

  const imageURL = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}/fr-75x50.png`;
  const highlightOptions = {
    stringColor: "#005CCD",
  };

  const imgCode = generatePngHtmlImgTag(
    widthValue,
    heightValue,
    countryName,
    isoValue
  );

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
  const currentHeightValue = !!heightValue ? `x${heightValue}` : "";
  const highlightOptions = { stringColor: "#005CCD" };

  const countryValue = selectedCountry.value;
  const countryName = selectedCountry.label;

  const imgCode = generatePngHtmlImgTag(
    widthValue,
    heightValue,
    countryName,
    countryValue
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
    null,
    null,
    countryName,
    countryValue,
    "svg"
  );

  const highlightOptions = {
    stringColor: "#005CCD",
  };

  const coloredJsonData = formatHighlight(imgCode, highlightOptions);

  if (countrySelectInput.value === "France") {
    countryCode.innerHTML = "fr";
  } else {
    countryCode.innerHTML = `${countryValue}`;
  }

  imgType.innerHTML = `svg`;
  svgBtn.style.backgroundColor = "#DFEEFF";
  pngBtn.style.backgroundColor = "#FFFF";
  resizeCheckBox.style.display = "none";
  resizeCheckboxWidth.style.display = "none";
  resizeCheckboxHeight.style.display = "none";
  flagSize.innerHTML = `200`;
  prettyData.innerHTML = coloredJsonData;
}

function changeCountryInputHandler(event) {
  isSelectedCountry = false;
}

function closeMobileNavbarHandler() {
  mobileNavbar.style.display = "none";
  backDrop.style.display = "none";
}

function openCountryListHandler(event) {
  event.stopPropagation();

  if (isCountryListOpen) {
    isoArrowIcon.style.transform = "rotate(0deg)";
    isCountryListOpen = false;
  } else {
    isoArrowIcon.style.transform = "rotate(180deg)";
    countrySelectInput.select();
    isCountryListOpen = true;
  }
}

function clearInputHandler() {
  countrySelectInput.value = "";
  inputCloseMark.style.display = "none";
}

function focusCountryInputHandler(event) {
  event.stopPropagation();

  countrySelectInput.select();

  openCountryListHandler(event);
}

function blurCountryInputHandler(event) {
  event.stopPropagation();

  openCountryListHandler(event);
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

  if (langSelectInput.value === "French") {
    langCountryCode.innerHTML = "fr";
  } else {
    langCountryCode.innerHTML = `${langValue}`;
  }

  langPrettyData.innerHTML = coloredJsonData;
  langImgType.innerHTML = `svg`;
  svgLangBtn.style.backgroundColor = "#DFEEFF";
  pngLangBtn.style.backgroundColor = "#FFFF";
  langCheckbox.style.display = "none";
  langCheckboxWidth.style.display = "none";
  langCheckboxHeight.style.display = "none";
  langFlagSize.innerHTML = `400x240`;
}

function changeLangInputHandler(event) {
  isSelectedLanguage = false;
}

function openLangListHandler() {
  if (isLangListOpen) {
    langArrowIcon.style.transform = "rotate(0deg)";
    isLangListOpen = false;
  } else {
    langArrowIcon.style.transform = "rotate(180deg)";
    langSelectInput.select();
    isLangListOpen = true;
  }
}

function clearLangInputHandler() {
  langSelectInput.value = "";
  langInputCloseMark.style.display = "none";
}

function focusLangInputHandler(event) {
  langSelectInput.select();

  openLangListHandler();
}

function blurLangInputHandler() {
  openLangListHandler();
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

function clearPhoneInputHandler() {
  phoneInput.value = "";
  phoneInputCloseMark.style.display = "none";
}

function openPhoneXMarkHandler() {
  phoneInputCloseMark.style.display = "block";
}

//country Iso attach events
countrySelectInput.addEventListener("focus", focusCountryInputHandler);
countrySelectInput.addEventListener("keydown", changeCountryInputHandler);
countrySelectInput.addEventListener("blur", blurCountryInputHandler);
pngBtn.addEventListener("click", changePngHandler);
svgBtn.addEventListener("click", debounce(changeSvgHandler, 350));
resizeCheck.addEventListener("click", resizeChecked);
resizeWidth.addEventListener("keydown", debounce(changeWidthHandler, 100));
resizeHeight.addEventListener("keydown", debounce(changeWidthHandler, 100));
dropBtn.addEventListener("click", dropdownFunction);
AssetsArrow.addEventListener("click", dropdownFunction);
isoArrowIcon.addEventListener("click", openCountryListHandler);
inputCloseMark.addEventListener("click", clearInputHandler);
backDrop.addEventListener("click", closeMobileNavbarHandler);
mobileNavbar.addEventListener("click", closeMobileNavbarHandler);
burgerBtn.addEventListener("click", toggleMobileNavbar);
window.addEventListener("keydown", keydown);

//language attach events
langSelectInput.addEventListener("focus", focusLangInputHandler);
langSelectInput.addEventListener("keydown", changeLangInputHandler);
langSelectInput.addEventListener("blur", blurLangInputHandler);
langArrowIcon.addEventListener("click", openLangListHandler);
pngLangBtn.addEventListener("click", changeLangPngHandler);
svgLangBtn.addEventListener("click", changeLangSvgHandler);
langResizeCheck.addEventListener("click", langResizeChecked);
langInputCloseMark.addEventListener("click", clearLangInputHandler);
langResizeWidth.addEventListener(
  "keydown",
  debounce(langChangeWidthHandler, 100)
);

langResizeHeight.addEventListener(
  "keydown",
  debounce(langChangeWidthHandler, 100)
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

phoneInputCloseMark.addEventListener("click", clearPhoneInputHandler);
