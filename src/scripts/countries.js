import formatHighlight from "json-format-highlight";

const countrySelect = document.getElementById("countrySelector");
const langSelect = document.getElementById("lang-Selector");
const phoneInput = document.getElementById("phone-input");
const isoButton = document.getElementById("isoButton");
const langButton = document.getElementById("lang-btn");
const phoneButton = document.getElementById("phone-button");
const flagImg = document.getElementById("flag-img");
const langFlagImg = document.getElementById("lang-flag-img");
const phoneImg = document.getElementById("phone-img");
const pngBtn = document.getElementById("png-btn");
const svgBtn = document.getElementById("svg-btn");
const pngLangBtn = document.getElementById("png-lang-btn");
const svgLangBtn = document.getElementById("svg-lang-btn");
const pngPhoneBtn = document.getElementById("png-phone-btn");
const svgPhoneBtn = document.getElementById("svg-phone-btn");
const validationOutput = document.getElementById("validation-output");
const langValidationOutput = document.getElementById("lang-validation-output");
const phoneValidationOutput = document.getElementById(
  "phone-validation-output"
);
const resizeCheck = document.getElementById("resize-check");
const resize = document.getElementById("resize");
const langResize = document.getElementById("lang-resize");
const phoneResize = document.getElementById("phone-resize");
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
const dropBtn = document.getElementById("dropBtn");
const dropDown = document.getElementById("dropDown");

function changeIsoFlagHandler() {
  const isoValue = countrySelect.value;
  const widthValue = resizeWidth.value;
  const heightValue = resizeHeight.value;
  const imageURL = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}/fr-75x50.png`;

  if (!!widthValue.length) {
    const highlightOptions = {
      stringColor: "#005CCD",
    };

    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-${widthValue}x${heightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-${widthValue}x${heightValue}.png 2x"
      width="${widthValue}"   
      height="${heightValue}"
      alt="${isoValue} flag">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);
    prettyData.innerHTML = coloredJsonData;
  } else {
    const highlightOptions = {
      stringColor: "#005CCD",
    };
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/fr-200.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/fr-400.png 2x"
      width="200"   
      height="120"
      alt="${isoValue} flag">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);
    prettyData.innerHTML = coloredJsonData;
  }
  // validationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-400x240.png`;
  flagImg.src = imageURL;
}

function changeLangFlagHandler() {
  const langValue = langSelect.value;
  const widthValue = langResizeWidth.value;
  const heightValue = langResizeHeight.value;
  const imageURL = `https://wordplex.cloudimg.io/v7w/flag/lang/${langValue}/fr-75x50.png`;

  if (!!widthValue.length) {
    const highlightOptions = {
      stringColor: "#005CCD",
    };
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/country/${langValue}-${widthValue}x${heightValue}.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/country/${langValue}-${widthValue}x${heightValue}.png 2x"
      width="${widthValue}"   
      height="${heightValue}"
      alt="${langValue} language">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);
    langPrettyData.innerHTML = coloredJsonData;
  } else {
    const highlightOptions = {
      stringColor: "#005CCD",
    };
    const imgCode = `&lt; img
      src="https://wordplex.cloudimg.io/v7w/flag/lang/${langValue}-200.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/lang/${langValue}-400.png 2x"
      width="200"   
      height="120"
      alt="${langValue} language">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);
    langPrettyData.innerHTML = coloredJsonData;
  }
  // langValidationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/lang/${langValue}-400x240.png`;
  langFlagImg.src = imageURL;
}

function changePhoneFlagHandler() {
  const phoneNumber = phoneInput.value;
  const widthValue = phoneResizeWidth.value;
  const heightValue = phoneResizeHeight.value;
  const imgURL = `https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-75x50.png`;

  if (!!widthValue.length) {
    const highlightOptions = {
      stringColor: "#005CCD",
    };
    const imgCode = `&lt; img 
      src="https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-200.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-400.png 2x"
      width="${widthValue}"   
      height="${heightValue}"
      alt="france language">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);
    phonePrettyData.innerHTML = coloredJsonData;
  } else {
    const highlightOptions = {
      stringColor: "#005CCD",
    };
    const imgCode = `&lt; img
      src="https://wordplex.cloudimg.io/v7w/flag/lang/${phoneNumber}-200.png"
      srcset= "https://wordplex.cloudimg.io/v7w/flag/lang/${phoneNumber}-400.png 2x"
      width="200"   
      height="120"
      alt="${phoneNumber} language">`;
    const coloredJsonData = formatHighlight(imgCode, highlightOptions);
    phonePrettyData.innerHTML = coloredJsonData;
  }

  phoneImg.src = imgURL;
  // phoneValidationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-200.png`;
}

(function countrySelector() {
  fetch(`http://geo.wordplex.io/v4/countries`)
    .then((res) => res.json())
    .then(({ items }) => {
      items.forEach((item) => {
        const option = document.createElement("option");
        option.innerHTML = item.name;
        option.value = item.alpha2Code;
        countrySelect.appendChild(option);
      });
    });
})();

(function langSelector() {
  fetch(`http://geo.wordplex.io/v4/langs`)
    .then((res) => res.json())
    .then(({ items }) => {
      items.forEach((item) => {
        const option = document.createElement("option");
        option.innerHTML = item.name;
        langSelect.appendChild(option);
      });
    });
})();

function changePngHandler() {
  const isoValue = countrySelect.value;
  validationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}/fr-75x50.png`;
  svgBtn.style.backgroundColor = "#FFFF";
  pngBtn.style.backgroundColor = "#DFEEFF";
  resize.style.display = "flex";
}

function changeSvgHandler() {
  const isoValue = countrySelect.value;
  validationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}/fr-75x50.svg`;
  svgBtn.style.backgroundColor = "#DFEEFF";
  pngBtn.style.backgroundColor = "#FFFF";
  resize.style.display = "none";
}

function changeLangPngHandler() {
  const langValue = langSelect.value;
  langValidationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/lang/${langValue}-400x240.png`;
  svgLangBtn.style.backgroundColor = "#FFFF";
  pngLangBtn.style.backgroundColor = "#DFEEFF";
  langResize.style.display = "flex";
}

function changeLangSvgHandler() {
  const langValue = langSelect.value;
  langValidationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/lang/${langValue}-400x240.svg`;
  svgLangBtn.style.backgroundColor = "#DFEEFF";
  pngLangBtn.style.backgroundColor = "#FFFF";
  langResize.style.display = "none";
}

function changePhonePngHandler() {
  const phoneNumber = phoneInput.value;
  phoneValidationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-400x240.png`;
  svgPhoneBtn.style.backgroundColor = "#FFFF";
  pngPhoneBtn.style.backgroundColor = "#DFEEFF";
  phoneResize.style.display = "flex";
}

function changePhoneSvgHandler() {
  const phoneNumber = phoneInput.value;
  phoneValidationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-400x240.svg`;
  svgPhoneBtn.style.backgroundColor = "#DFEEFF";
  pngPhoneBtn.style.backgroundColor = "#FFFF";
  phoneResize.style.display = "none";
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

function dropDownFunction() {
  dropDown.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropBtn")) {
    var dropdowns = document.getElementsByClassName("dropDown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function changeWidthHandler() {
  const isoValue = countrySelect.value;
  const widthValue = resizeWidth.value;
  const heightValue = resizeHeight.value;
  validationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/country/${isoValue}-${widthValue}x${heightValue}.png`;
}

function langChangeWidthHandler() {
  const langValue = langSelect.value;
  const widthValue = langResizeWidth.value;
  const heightValue = langResizeHeight.value;
  langValidationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/lang/${langValue}-${widthValue}x${heightValue}.png`;
}

function phoneChangeWidthHandler() {
  const phoneNumber = phoneInput.value;
  const widthValue = phoneResizeWidth.value;
  const heightValue = phoneResizeHeight.value;
  phoneValidationOutput.value = `https://wordplex.cloudimg.io/v7w/flag/phone/${phoneNumber}-${widthValue}x${heightValue}.png`;
}

isoButton.addEventListener("click", changeIsoFlagHandler);
langButton.addEventListener("click", changeLangFlagHandler);
phoneButton.addEventListener("click", changePhoneFlagHandler);
pngBtn.addEventListener("click", changePngHandler);
svgBtn.addEventListener("click", changeSvgHandler);
pngPhoneBtn.addEventListener("click", changePhonePngHandler);
svgPhoneBtn.addEventListener("click", changePhoneSvgHandler);
pngLangBtn.addEventListener("click", changeLangPngHandler);
svgLangBtn.addEventListener("click", changeLangSvgHandler);
resizeCheck.addEventListener("click", resizeChecked);
resizeWidth.addEventListener("change", changeWidthHandler);
resizeHeight.addEventListener("change", changeWidthHandler);
langResizeCheck.addEventListener("click", langResizeChecked);
phoneResizeCheck.addEventListener("click", phoneResizeChecked);
langResizeWidth.addEventListener("change", langChangeWidthHandler);
langResizeHeight.addEventListener("change", langChangeWidthHandler);
phoneResizeWidth.addEventListener("change", phoneChangeWidthHandler);
phoneResizeHeight.addEventListener("change", phoneChangeWidthHandler);
dropBtn.addEventListener("click", dropDownFunction);
