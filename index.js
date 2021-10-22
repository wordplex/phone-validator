import { countries } from './countries.js';

const input = document.getElementById("input");
const selector = document.getElementById("select");
const button = document.getElementById("button");
const countryCodeSwitcher = document.getElementById("switcher");


function inputData() {
  const phoneNumber = parseInt(input.value, 10);
  
  if (typeof phoneNumber === 'number') {
    return phoneNumber
  }else {
    console.log ('please enter valid number');
  }
}

async function displayData() {
  const phoneNumbers = inputData();
  const countryNumber = selector.value;
  fetch(`http://geo.wordplex.io/v4/phone?phone=${phoneNumbers}&codes=${countryNumber}`)
    .then((res) => res.json())
    .then((data) => {
    console.log (data);
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
countryCodeSwitcher.addEventListener('change', countrySwitcherHandler);
