import { countries } from './countries.js';

const input = document.getElementById("input");
const selector = document.getElementById("select");
const button = document.getElementById("button");
const validateInput = document.getElementById("valid");
const lineType = document.getElementById("lineType");
const countryCode = document.getElementById("countryCode");
const network = document.getElementById("network");
const location = document.getElementById("location");
const jsonbtn = document.getElementById("json");
const formbtn = document.getElementById("form-btn");
const jsonresults = document.getElementById("json-results");
const formattedresults = document.getElementById("formatted-results");
const number = document.getElementById("number");
const validnumber = document.getElementById("valid-number");
const localformat = document.getElementById("local-format");
const inteformat = document.getElementById("inte-format");
const linetype = document.getElementById("line-type");
const reglocation = document.getElementById("reg-location");
const jsonnetwork = document.getElementById("net-work");



function inputData() {
  const phoneNumber = parseInt(input.value, 10);
  
  if (typeof phoneNumber === 'number') {
    return phoneNumber
  }else {
    console.log ('please enter valid number');
  }
}

function jsonhandler() {
  jsonresults.style = "display";
  jsonbtn.style = "background-color:#002C60";
  formattedresults.style = "display : none";
  formbtn.style = "background-color:#00152F";
}

function formbtnhandler() {
  formattedresults.style ="display";
  jsonbtn.style = "background-color:#00152F";
  jsonresults.style = "display : none";
  formbtn.style = "background-color:#002C60";
}

async function displayData() {
  const phoneNumbers = inputData();
  const countryNumber = selector.value;
  fetch(`http://geo.wordplex.io/v4/phone?phone=${phoneNumbers}&country=${countryNumber}`)
    .then((res) => res.json())
    .then((data) => {
        if (!!data.is_number_valid) {
          console.log(data)
          number.innerHTML = `"number": "${data.number_parts.nat}"`;
          validnumber.innerHTML = ` "is_valid_number": "${data.is_number_possible}"`;
          localformat.innerHTML = `"local_format": "${data.number_parts.nat}"`;
          inteformat.innerHTML = `international_format": "${data.number_parts.nat.intl}"`;
          linetype.innerHTML = `"line_type": "${data.type}"`;
          reglocation.innerHTML = `"registered_location": "${data.location.name}"`;
          jsonnetwork.innerHTML = `"network": "${data.location.iso2}"`;
          validateInput.value = "true";
          lineType.value = `${data.type}`;
          countryCode.value = `+ ${data.number_parts.country_code}`;
          network.value = `${data.carrier.name}`;
          location.value = `${data.location.name}`;
        }else {
          validateInput.value = "false";
          lineType.value = "unknown";
          countryCode.value = "unknown";
          network.value = "unknown";
          location.value = "unknown";
        }
    })
    .catch((err) => {
      console.log (err);
    })
}

(function countrySelector() {
  countries.forEach(element => {
    const option = document.createElement ('option');

    option.innerHTML = `${element.name} (${element.code})`;
    option.value = element.code;

    selector.append(option);
  });
})()


function countrySwitcherHandler(event) {
  selector.disabled = !(!!event.target.checked);
}

input.addEventListener('change', inputData);
button.addEventListener('click', displayData);
jsonbtn.addEventListener('click', jsonhandler);
formbtn.addEventListener('click', formbtnhandler);
