import formatHighlight from "json-format-highlight";
import { debounce } from "./utils";

const countrySelect = document.getElementById("country-selector");
const countrySelectInput = document.getElementById("country-selector-input");
const langCountrySelectInput = document.getElementById(
  "lang-country-selector-input"
);
const resizeCheckBox = document.getElementById("resize-checkbox");
const resizeCheckboxWidth = document.getElementById("resize-checkbox-width");
const resizCheckboxHeight = document.getElementById("resize-checkbox-height");
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

let fetchedCountries;
let fetchedLanguage;

function getSelectedCountry() {
  const selectedCountryName = countrySelectInput.value;
  const selectedCountry = fetchedCountries.find(
    (fetchedCountry) => fetchedCountry.name === selectedCountryName
  );

  return selectedCountry;
}

function getSelectedCountryByLang() {
  const langName = langCountrySelectInput.value;
  const countryValue = fetchedLanguage.find(
    (countryNames) => countryNames.name === langName
  );
  return countryValue;
}

function changeIsoFlagHandler() {
  const selectedCountryName = countrySelectInput.value;
  const widthValue = resizeWidth.value;
  const heightValue = resizeHeight.value;
  const selectedCountry = fetchedCountries.find(
    (fetchedCountry) => fetchedCountry.name === selectedCountryName
  );
  const countryName = selectedCountry.name;
  const iso2Value = selectedCountry.alpha2Code;
  const isoValue = getSelectedCountry().alpha2Code;
  const imageURL = `https://wordplex.cloudimg.io/v7w/flag/country/${iso2Value}/fr-75x50.png`;
  const highlightOptions = {
    stringColor: "#005CCD",
  };

  if (widthValue && !heightValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${iso2Value}-${widthValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${iso2Value}-${widthValue}.png 2x"
      width="${widthValue}"   
      height="auto"
      alt="${countryName} flag">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    url.innerHTML = `https://wordplex.cloudimg.io/v7w/flag/country/`;
    countryCode.innerHTML = `${isoValue}`;
    flagSize.innerHTML = `${widthValue}x${heightValue}`;
    prettyData.innerHTML = coloredJsonData;
  } else if (heightValue && !widthValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${iso2Value}-${heightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${iso2Value}-${heightValue}.png 2x"
      width="auto"   
      height="${heightValue}"
      alt="${countryName} flag">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    prettyData.innerHTML = coloredJsonData;
    countryCode.innerHTML = `${isoValue}`;
  } else if (!heightValue && !widthValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${iso2Value}-200.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${iso2Value}-400.png 2x"
      width="auto"   
      height="auto"
      alt="${countryName} flag">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    prettyData.innerHTML = coloredJsonData;
    countryCode.innerHTML = `${isoValue}`;
  } else if (widthValue && heightValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-${widthValue}x${heightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-${widthValue}x${heightValue}.png 2x"
      width="${widthValue}"   
      height="${heightValue}"
      alt="${countryName} flag">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    url.innerHTML = `https://wordplex.cloudimg.io/v7w/flag/country/`;
    countryCode.innerHTML = `${isoValue}`;
    flagSize.innerHTML = `${widthValue}x${heightValue}`;
    prettyData.innerHTML = coloredJsonData;
  }
  flagImg.src = imageURL;
}

function changeLangFlagHandler() {
  const langName = langCountrySelectInput.value;
  const widthValue = langResizeWidth.value;
  const heightValue = langResizeHeight.value;
  const countryValue = getSelectedCountryByLang().iso_2;
  const imageURL = `https://wordplex.cloudimg.io/v7w/flag/lang/${countryValue}-75x50.png`;
  const highlightOptions = {
    stringColor: "#005CCD",
  };

  if (widthValue && !heightValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-${widthValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-${widthValue}.png 2x"
      width="${widthValue}"   
      height="auto"
      alt="${langName} language">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    langUrl.innerHTML = `https://wordplex.cloudimg.io/v7w/flag/country/`;
    langCountryCode.innerHTML = `${countryValue}`;
    langFlagSize.innerHTML = `${widthValue}x${heightValue}`;
    langPrettyData.innerHTML = coloredJsonData;
  } else if (heightValue && !widthValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-${heightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-${heightValue}.png 2x"
      width="auto"   
      height="${heightValue}"
      alt="${langName} language">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    langPrettyData.innerHTML = coloredJsonData;
    langCountryCode.innerHTML = `${countryValue}`;
  } else if (!heightValue && !widthValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-200.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-400.png 2x"
      width="auto"   
      height="auto"
      alt="${langName} language">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    langPrettyData.innerHTML = coloredJsonData;
    langCountryCode.innerHTML = `${countryValue}`;
    langFlagSize.innerHTML = `400x240`;
  } else if (widthValue && heightValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-${widthValue}x${heightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${countryValue}-${widthValue}x${heightValue}.png 2x"
      width="${widthValue}"   
      height="${heightValue}"
      alt="${langName} language">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    langUrl.innerHTML = `https://wordplex.cloudimg.io/v7w/flag/country/`;
    langCountryCode.innerHTML = `${countryValue}`;
    langFlagSize.innerHTML = `${widthValue}x${heightValue}`;
    langPrettyData.innerHTML = coloredJsonData;
  }

  langFlagImg.src = imageURL;
}

function changePhoneFlagHandler() {
  const phoneNumber = phoneInput.value;
  const widthValue = phoneResizeWidth.value;
  const heightValue = phoneResizeHeight.value;
  const imgURL = `https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-75x50.png`;
  const highlightOptions = {
    stringColor: "#005CCD",
  };

  if (widthValue && !heightValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-${widthValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-${widthValue}.png 2x"
      width="${widthValue}"   
      height="auto"
      alt="">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    phoneUrl.innerHTML = `https://wordplex.cloudimg.io/v7w/flag/phone/`;
    phoneCountryCode.innerHTML = `${phoneNumber}`;
    phoneFlagSize.innerHTML = `${widthValue}x${heightValue}`;
    phonePrettyData.innerHTML = coloredJsonData;
  } else if (heightValue && !widthValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-${heightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-${heightValue}.png 2x"
      width="auto"   
      height="${heightValue}"
      alt="">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    phonePrettyData.innerHTML = coloredJsonData;
    phoneCountryCode.innerHTML = `${phoneNumber}`;
  } else if (!heightValue && !widthValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-200.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-400.png 2x"
      width="auto"   
      height="auto"
      alt="">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    phonePrettyData.innerHTML = coloredJsonData;
    phoneCountryCode.innerHTML = `${phoneNumber}`;
    phoneFlagSize.innerHTML = `400x240`;
  } else if (widthValue && heightValue) {
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-${widthValue}x${heightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-${widthValue}x${heightValue}.png 2x"
      width="${widthValue}"   
      height="${heightValue}"
      alt="">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);

    phoneUrl.innerHTML = `https://wordplex.cloudimg.io/v7w/flag/phone/`;
    phoneCountryCode.innerHTML = `${phoneNumber}`;
    phoneFlagSize.innerHTML = `${widthValue}x${heightValue}`;
    phonePrettyData.innerHTML = coloredJsonData;
  }
  phoneImg.src = imgURL;
}

(function countrySelector() {
  fetch(`http://geo.wordplex.io/v4/countries`)
    .then((res) => res.json())
    .then(({ items }) => {
      fetchedCountries = items;
      items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.name;
        option.innerHTML = item.alpha2Code;
        countrySelect.appendChild(option);
      });
    });
})();

(function langSelector() {
  fetch(`http://geo.wordplex.io/v4/langs`)
    .then((res) => res.json())
    .then(({ items }) => {
      fetchedLanguage = items;
      items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.name;
        option.innerHTML = item.iso_2;
        langCountrySelector.appendChild(option);
      });
    });
})();

function changePngHandler() {
  imgType.innerHTML = `png`;
  svgBtn.style.backgroundColor = "#FFFF";
  pngBtn.style.backgroundColor = "#DFEEFF";
  resizeCheckBox.style.display = "block";
  resizeCheckboxWidth.style.display = "block";
  resizCheckboxHeight.style.display = "block";

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
  resizCheckboxHeight.style.display = "none";
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
    let dropdowns = document.getElementsByClassName("dropDown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function changeWidthHandler() {
  const widthValue = resizeWidth.value;
  const heightValue = resizeHeight.value;

  changeIsoFlagHandler();

  if (!heightValue && widthValue) {
    flagSize.innerHTML = `${widthValue}`;
  } else if (!widthValue && heightValue) {
    flagSize.innerHTML = `${heightValue}`;
  } else if (!widthValue && !heightValue) {
    flagSize.innerHTML = `400x200`;
  }
}

function langChangeWidthHandler() {
  const widthValue = langResizeWidth.value;
  const heightValue = langResizeHeight.value;

  changeLangFlagHandler();

  if (!heightValue && widthValue) {
    langFlagSize.innerHTML = `${widthValue}`;
  } else if (!widthValue && heightValue) {
    langFlagSize.innerHTML = `${heightValue}`;
  } else if (!widthValue && !heightValue) {
    flagSize.innerHTML = `400x200`;
  }
}

function phoneChangeWidthHandler() {
  const widthValue = phoneResizeWidth.value;
  const heightValue = phoneResizeHeight.value;

  changePhoneFlagHandler();

  if (!heightValue && widthValue) {
    phoneFlagSize.innerHTML = `${widthValue}`;
  } else if (!widthValue && heightValue) {
    phoneFlagSize.innerHTML = `${heightValue}`;
  } else if (!widthValue && !heightValue) {
    flagSize.innerHTML = `400x200`;
  }
}

langCountrySelectInput.addEventListener("change", changeLangFlagHandler);
countrySelectInput.addEventListener("change", changeIsoFlagHandler);
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
