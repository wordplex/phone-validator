import formatHighlight from "json-format-highlight";

const input = document.getElementById("input");
const selector = document.getElementById("select");
const button = document.getElementById("button");
const validateInput = document.getElementById("valid");
const lineType = document.getElementById("line-type");
const countryCode = document.getElementById("country-code");
const netWork = document.getElementById("network");
const location = document.getElementById("location");
const jsonBtn = document.getElementById("json");
const formBtn = document.getElementById("form-btn");
const jsonResults = document.getElementById("json-results");
const prettyData = document.getElementById("pretty-data");
const formattedResults = document.getElementById("formatted-results");
const checkMark = document.getElementById("check-mark");
const falseMark = document.getElementById("false-mark");
const burgerBtn = document.getElementById("burger-btn");
const mobileNavbar = document.getElementById("mobile-navbar");
const backDrop = document.getElementById("backdrop");
const dropBtn = document.getElementById("dropBtn");
const dropDown = document.getElementById("dropDown");
const AssetsArrow = document.getElementById("assets-arrow");

function inputData() {
  const phoneNumber = parseInt(input.value, 10);

  if (typeof phoneNumber === "number") {
    return phoneNumber;
  } else {
    console.log("please enter valid number");
  }
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

function closeMobileNavbar() {
  mobileNavbar.style.display = "none";
  backDrop.style.display = "none";
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

function dataHandler(data) {
  validateInput.value = data.is_number_valid;
}

(function inputFocus() {
  input.focus();
})();

async function displayData() {
  const phoneNumbers = inputData();
  const countryNumber = selector.value;
  let Url = `http://geo.wordplex.io/v4/phone?phone=${phoneNumbers}&country=${countryNumber}`;

  if (countryNumber === "Any country") {
    Url = `http://geo.wordplex.io/v4/phone?phone=${phoneNumbers}`;
  }
  fetch(Url)
    .then((res) => res.json())
    .then((data) => {
      if (!!data.is_number_valid) {
        appendData(data);
        dataHandler(data);
        checkMark.style.display = "flex";
        checkMark.style.background = "#82BE18";
        falseMark.style.display = "none";
        validateInput.style.color = "#82BE18";
        lineType.value = data.type;
        countryCode.value = `+ ${data.number_parts.country_code}`;
        netWork.value = data.carrier.name;
        location.value = data.location.name;
      } else {
        appendData(data);
        dataHandler(data);
        validateInput.style.color = "#FF5722";
        falseMark.style.display = "flex";
        checkMark.style.display = "none";
        lineType.value = "unknown";
        countryCode.value = "unknown";
        netWork.value = "unknown";
        location.value = "unknown";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

(function countrySelector() {
  fetch(`http://geo.wordplex.io/v4/countries`)
    .then((res) => res.json())
    .then(({ items }) => {
      items.forEach((item) => {
        const option = document.createElement("option");
        option.innerHTML = item.name;
        option.value = item.alpha2Code;
        selector.appendChild(option);
      });
    });
})();

window.addEventListener("keydown", keyDown);
input.addEventListener("change", inputData);
input.addEventListener("keyup", keyUp);
button.addEventListener("click", displayData);
jsonBtn.addEventListener("click", jsonHandler);
formBtn.addEventListener("click", formBtnHandler);
burgerBtn.addEventListener("click", toggleMobileNavbar);
backDrop.addEventListener("click", closeMobileNavbar);
mobileNavbar.addEventListener("click", closeMobileNavbar);
dropBtn.addEventListener("click", dropdownFunction);
AssetsArrow.addEventListener("click", dropdownFunction);
