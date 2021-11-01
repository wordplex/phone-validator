
import '../styles/main.css'
import '../styles/documentation.css'
import documentationPage from "../documentation.html";

const input = document.getElementById("input");
const selector = document.getElementById("select");
const button = document.getElementById("button");
const validateInput = document.getElementById("valid");
const lineType = document.getElementById("lineType");
const countryCode = document.getElementById("countryCode");
const netWork = document.getElementById("network");
const location = document.getElementById("location");
const jsonBtn = document.getElementById("json");
const formBtn = document.getElementById("form-btn");
const jsonResults = document.getElementById("json-results");
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
const documentationSection = document.getElementById('documentation-section');



documentationSection.innerHTML = documentationPage;


function inputData() {
  const phoneNumber = parseInt(input.value, 10);

  if (typeof phoneNumber === 'number') {
    return phoneNumber
  } else {
    console.log('please enter valid number');
  }
}

function jsonhandler() {
  jsonResults.style = "display";
  jsonBtn.style = "background-color:#00152F";
  formattedResults.style = "display : none";
  formBtn.style = "background-color:#002C60";
}

function formbtnhandler() {
  formattedResults.style = "display";
  jsonBtn.style = "background-color:#002C60";
  jsonResults.style = "display : none";
  formBtn.style = "background-color:#00152F";
}

function enterkey(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
}

async function displayData() {
  const phoneNumbers = inputData();
  const countryNumber = selector.value;
  fetch(`http://geo.wordplex.io/v4/phone?phone=${phoneNumbers}&country=${countryNumber}`)
    .then((res) => res.json())
    .then((data) => {
      if (!!data.is_number_valid) {
        number.innerHTML = `"number": "${data.number_parts.nat}"`;
        validNumber.innerHTML = ` "is_valid_number": "${data.is_number_possible}"`;
        localFormat.innerHTML = `"local_format": "${data.number_parts.nat}"`;
        inteFormat.innerHTML = `international_format": "${data.number_parts.intl}"`;
        lineTypeJson.innerHTML = `"line_type": "${data.type}"`;
        regLocation.innerHTML = `"registered_location": "${data.location.name}"`;
        jsonNetwork.innerHTML = `"network": "${data.location.iso2}"`;
        checkMark.style = 'display'
        checkMark.style.background = '#82BE18'
        falseMark.style = "display: none;"
        validateInput.value = "true";
        lineType.value = `${data.type}`;
        countryCode.value = `+ ${data.number_parts.country_code}`;
        netWork.value = `${data.carrier.name}`;
        location.value = `${data.location.name}`;
      } else {
        validateInput.value = "false";
        falseMark.style = "display"
        checkMark.style = 'display: none;'
        lineType.value = "unknown";
        countryCode.value = "unknown";
        netWork.value = "unknown";
        location.value = "unknown";
        number.innerHTML = `"number": " false"`;
        validNumber.innerHTML = ` "is_valid_number": "unknown"`;
        localFormat.innerHTML = `"local_format": "unknown"`;
        inteFormat.innerHTML = `international_format": "unknown"`;
        lineTypeJson.innerHTML = `"line_type": "unknown"`;
        regLocation.innerHTML = `"registered_location": "unknown"`;
        jsonNetwork.innerHTML = `"network": "unknown"`;
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

input.addEventListener('keyup', enterkey);
input.addEventListener('change', inputData);
button.addEventListener('click', displayData);
jsonBtn.addEventListener('click', jsonhandler);
formBtn.addEventListener('click', formbtnhandler);