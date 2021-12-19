import formatHighlight from "json-format-highlight";
import autocomplete from "autocompleter";

const input = document.getElementById("input");
const validateInput = document.getElementById("valid");
const countryInput = document.getElementById("country-input");
const inputCloseMark = document.getElementById("input-close-mark");
const button = document.getElementById("button");
const dropBtn = document.getElementById("dropBtn");
const dropDown = document.getElementById("dropDown");
const jsonBtn = document.getElementById("json");
const formBtn = document.getElementById("form-btn");
const burgerBtn = document.getElementById("burger-btn");
const lineType = document.getElementById("line-type");
const countryCode = document.getElementById("country-code");
const network = document.getElementById("network");
const location = document.getElementById("location");
const jsonResults = document.getElementById("json-results");
const prettyData = document.getElementById("pretty-data");
const formattedResults = document.getElementById("formatted-results");
const checkMark = document.getElementById("check-mark");
const falseMark = document.getElementById("false-mark");
const mobileNavbar = document.getElementById("mobile-navbar");
const AssetsArrow = document.getElementById("assets-arrow");
const backDrop = document.getElementById("backdrop");
const warningMessage = document.getElementById("warning-message");
const arrowIcon = document.getElementById("arrow-icon");

let isSelectedCountry = false;
let selectedCountry = {};
let isListOpen = false;

(function fetchingCountries() {
  fetch(`http://geo.wordplex.io/v4/countries`)
    .then((res) => res.json())
    .then(({ items }) => {
      autocomplete({
        input: countryInput,
        fetch: function (text, update) {
          countryInput.value
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
          countryInput.value = item.label;

          countryInput.blur();

          selectedCountry = item;
        },
      });
    });
})();

function fetchPhoneNumber() {
  const phoneNumber = parseInt(input.value, 10);

  return phoneNumber;
}

async function displayData() {
  const phoneNumbers = fetchPhoneNumber();
  const countryValue = selectedCountry.value;
  let Url = `http://geo.wordplex.io/v4/phone?phone=${phoneNumbers}&country=${countryValue}`;

  if (!countryValue && input.value) {
    Url = `http://geo.wordplex.io/v4/phone?phone=${phoneNumbers}`;
  }

  fetch(Url)
    .then((res) => res.json())
    .then((data) => {
      if (!!data.is_number_valid) {
        checkMark.style.display = "flex";
        checkMark.style.background = "#82BE18";
        falseMark.style.display = "none";
        validateInput.style.color = "#82BE18";
        lineType.value = data.type;
        countryCode.value = `+ ${data.number_parts.country_code}`;
        network.value = data.carrier.name;
        location.value = data.location.name;
      } else {
        warningMessage.style.display = "block";
        validateInput.style.color = "#FF5722";
        falseMark.style.display = "flex";
        checkMark.style.display = "none";
        lineType.value = "unknown";
        countryCode.value = "unknown";
        network.value = "unknown";
        location.value = "unknown";
      }

      appendData(data);
      setTimeout(() => dataHandler(data), 10);
    });
}

function keyDown(event) {
  if (event.keyCode === 27) {
    event.preventDefault();

    burgerBtn.blur();

    button.click();

    mobileNavbar.style.display = "none";
  }
}

function keyUp(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }

  if (input.value) {
    button.disabled = false;
    button.style.backgroundColor = "#82BE18";
    button.style.cursor = "pointer";
  }

  if (input.value === "") {
    button.disabled = true;
    button.style.backgroundColor = "#7F9ABE";
    warningMessage.style.display = "none";
    button.style.cursor = "unset";
  }
}

function dropdownFunction() {
  event.stopPropagation();
  dropDown.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropBtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
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

function appendData(data) {
  const highlightOptions = {
    keyColor: "#DFEEFF",
    stringColor: "#82BE18",
    trueColor: "#82BE18",
    falseColor: "red",
    numberColor: "#82BE18",
  };
  const coloredJsonData = formatHighlight(data, highlightOptions);
  prettyData.innerHTML = coloredJsonData;
}

(function inputFocus() {
  input.focus();
})();

function warningValidateMessage(event) {
  if (input.value === "") {
    warningMessage.style.display = "block";
  } else if (event.target.value === input.length) {
    warningMessage.style.display = "none";
  } else {
    warningMessage.style.display = "none";
  }
}

//event handler
function clearInputHandler() {
  selectedCountry = {};
  countryInput.value = "";
  inputCloseMark.style.display = "none";
}

function dataHandler(data) {
  validateInput.value = data.is_number_valid;
}

function openCountryListHandler() {
  if (isListOpen) {
    arrowIcon.style.transform = "rotate(0deg)";
    isListOpen = false;
  } else {
    arrowIcon.style.transform = "rotate(180deg)";
    countryInput.select();
    isListOpen = true;
  }
}

function changeInputHandler(event) {
  isSelectedCountry = false;
}

function focusInputHandler(event) {
  countryInput.select();
  openCountryListHandler();
}

function blurCountryInputHandler() {
  openCountryListHandler();
}

function closeMobileNavbarHandler() {
  mobileNavbar.style.display = "none";
  backDrop.style.display = "none";
}

function closeWarningHandler() {
  warningMessage.style.display = "none";
}

function jsonHandler() {
  jsonResults.style.display = "flex";
  jsonBtn.style.backgroundColor = "#011A37";
  formattedResults.style.display = "none";
  formBtn.style.backgroundColor = "#002C60";
}

function formBtnHandler() {
  formattedResults.style.display = "flex";
  jsonBtn.style.backgroundColor = "#002C60";
  jsonResults.style.display = "none";
  formBtn.style.backgroundColor = "#011A37";
}

//attach events
window.addEventListener("keydown", keyDown);
countryInput.addEventListener("focus", focusInputHandler);
countryInput.addEventListener("blur", blurCountryInputHandler);
countryInput.addEventListener("keydown", changeInputHandler);
inputCloseMark.addEventListener("click", clearInputHandler);
input.addEventListener("change", fetchPhoneNumber);
input.addEventListener("click", closeWarningHandler);
input.addEventListener("keyup", keyUp);
button.addEventListener("click", displayData);
button.addEventListener("click", warningValidateMessage);
jsonBtn.addEventListener("click", jsonHandler);
formBtn.addEventListener("click", formBtnHandler);
burgerBtn.addEventListener("click", toggleMobileNavbar);
dropBtn.addEventListener("click", dropdownFunction);
backDrop.addEventListener("click", closeMobileNavbarHandler);
mobileNavbar.addEventListener("click", closeMobileNavbarHandler);
AssetsArrow.addEventListener("click", dropdownFunction);
arrowIcon.addEventListener("click", openCountryListHandler);
