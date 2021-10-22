import { countries } from './countries.js';

const input = document.getElementById("input")
const selector = document.getElementById("select")
const button = document.getElementById("button")

input.addEventListener('change',inputData)
button.addEventListener('click' , displayData)

function inputData() {
  const phoneNumber = parseInt (input.value, 10);
  
  if (typeof phoneNumber ==='number') {
   
    return phoneNumber

  }else {
    console.log ('please enter valid number')
  }
}

async function displayData() {
  const PhoneNumbers = inputData()
  const countryNumber = selector.value
  console.log(countryNumber)
  fetch(`http://geo.wordplex.io/v4/phone?phone=${PhoneNumbers}&country=${countryNumber}`)
    .then((res) => res.json ())
    .then((data) => {
    console.log (data)
  }).catch(err => {
    console.log (err)
  })
}

function countrySelector() {
  countries.forEach(element =>{
    const option = document.createElement ('option')
    option.innerHTML= element.name
    option.value = element.code
    select.append (option)
  });
}
 
countrySelector();