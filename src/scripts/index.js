
import formatHighlight from 'json-format-highlight';

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
const number = document.getElementById("number");
const validNumber = document.getElementById("valid-number");
const localFormat = document.getElementById("local-format");
const inteFormat = document.getElementById("inte-format");
const lineTypeJson = document.getElementById("line-type");
const regLocation = document.getElementById("reg-location");
const jsonNetwork = document.getElementById("network");
const checkMark = document.getElementById("check-mark");
const falseMark = document.getElementById("false-mark");
const burgerBtn = document.getElementById("burger-btn");
const mobileNavbar = document.getElementById("mobile-navbar");
const backDrop = document.getElementById("backdrop");

function inputData() {
  const phoneNumber = parseInt(input.value, 10);

  if (typeof phoneNumber === 'number') {
    return phoneNumber
  } else {
    console.log('please enter valid number');
  }
}

function jsonHandler() {
  jsonResults.style = "display";
  jsonBtn.style = "background-color:#00152F";
  formattedResults.style = "display : none";
  formBtn.style = "background-color:#002C60";
}

function formBtnHandler() {
  formattedResults.style = "display";
  jsonBtn.style = "background-color:#002C60";
  jsonResults.style = "display : none";
  formBtn.style = "background-color:#00152F";
}

function keyDown(event) {
  if (event.keyCode === 27) {
    event.preventDefault();

    burgerBtn.blur();

    button.click()

    mobileNavbar.style.display = 'none';
  }
}

function keyUp(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  };
}

function toggleMobileNavbar() {
  if (!mobileNavbar.offsetWidth) {
    mobileNavbar.style.display = 'flex';
    backDrop.style.display = 'flex';
  } else {
    mobileNavbar.style.display = 'none';
    backDrop.style.display = 'none';
  }
}

function closeMobileNavbar() {
  mobileNavbar.style.display = 'none';
  backDrop.style.display = 'none';
}

function getResponseFalseColor(response) {
  return `"${response.fontcolor('red')}"`;
}

function appendData(data) {
  const highlightOptions = { 
    keyColor: '#DFEEFF',
    stringColor: '#82BE18',
    trueColor: '#82BE18',
    falseColor: 'red',
    numberColor: '#82BE18'
  };
  
  const coloredJsonData = formatHighlight(data, highlightOptions);

  prettyData.innerHTML = coloredJsonData;
}

async function displayData() {
  const phoneNumbers = inputData();
  const countryNumber = selector.value;
  let Url = `http://geo.wordplex.io/v4/phone?phone=${phoneNumbers}&country=${countryNumber}`
  
if (countryNumber === "Any country") {Url = `http://geo.wordplex.io/v4/phone?phone=${phoneNumbers}`} 
  fetch(Url)
    .then((res) => res.json())
    .then((data) => {
      if (!!data.is_number_valid) {
        appendData(data)
        checkMark.style = 'display'
        checkMark.style.background = '#82BE18'
        falseMark.style = "display: none;"
        validateInput.value = "true";
        lineType.value = `${data.type}`;
        countryCode.value = `+ ${data.number_parts.country_code}`;
        netWork.value = `${data.carrier.name}`;
        location.value = `${data.location.name}`;
      } else {
        appendData(data)
        validateInput.value = "false";
        falseMark.style = "display"
        checkMark.style = 'display: none;'
        lineType.value = "unknown";
        countryCode.value = "unknown";
        netWork.value = "unknown";
        location.value = "unknown";
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

(function countrySelector() {
  fetch(`http://geo.wordplex.io/v4/countries`)
    .then((res) => res.json())
    .then(({ items }) => {
      items.forEach(item => {
        const option = document.createElement('option')
        option.innerHTML = item.name
        option.value = item.alpha2Code
        selector.appendChild(option)
      })
    })
})()

function countrySwitcherHandler(event) {
  selector.disabled = !(!!event.target.checked);
}

window.addEventListener('keydown', keyDown);
input.addEventListener('change', inputData);
input.addEventListener('keyup', keyUp);
button.addEventListener('click', displayData);
jsonBtn.addEventListener('click', jsonHandler);
formBtn.addEventListener('click', formBtnHandler);
burgerBtn.addEventListener('click', toggleMobileNavbar);
backDrop.addEventListener('click', closeMobileNavbar);
mobileNavbar.addEventListener('click', closeMobileNavbar);