"use strict"

let key = "5fd536a4e4ccaaf4de60ad08fb5d3aed";
let output = document.getElementById("output-container")
let btn = document.getElementById('btn')
let input = document.getElementById('input')

let loaderDiv = document.getElementById('loader')

function showLoader(){
  loaderDiv.classList.add('show')
}

function hideLoader (){
  loaderDiv.classList.remove('show')
}

let getFetch = (url)=>{
  showLoader()
  fetch(url)
    .then((response)=> response.json())
    .then( (data) => {
      hideLoader()
      console.log(data)
          output.innerHTML = `
        <h2 class="city-name">${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1 class="temp">${Math.floor (data.main.temp) }&#176;</h1>`
    })
    .catch(()=>{
      output.innerHTML = `<h3 class="msg"> City not found</h3>`
    })
}


let getWeatherByGeo = () =>{

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;

    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
    `lon=${lon}&appid=${key}&units=metric`;
  getFetch(url)
  
  })
}
}
let getWeather = (event) => {
  let city = input.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  input.value = ''
    getFetch(url)
    event.preventDefault()
}

let form = document.getElementById('form')
form.onsubmit = getWeather




btn.addEventListener("click", getWeather)
