import { countries } from './countries.js';

const input = document.getElementById("input");
const selector = document.getElementById("select");
const button = document.getElementById("button")
const countryCodeSwitcher = document.getElementById("switcher");
const displayresultBefore = document.getElementById("container")
const displayresultAfter = document.getElementById("container")
const modal = document.getElementById('id01');

function inputData() {
  const phoneNumber = parseInt(input.value, 10);
  
  if (typeof phoneNumber === 'number') {
    return phoneNumber
  }else {
    console.log ('please enter valid number');
  }
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

async function displayData() {
  const phoneNumbers = inputData();
  const countryNumber = selector.value;
  fetch(`http://geo.wordplex.io/v4/phone?phone=${phoneNumbers}&country=${countryNumber}`)
    .then((res) => res.json())
    .then((data) => {
      displayresultBefore.innerHTML = JSON.stringify(data);
      displayresultAfter.innerHTML = "<pre>"+JSON.stringify(data,undefined, 2) +"</pre>"
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
