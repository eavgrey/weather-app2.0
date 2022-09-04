key = "5fd536a4e4ccaaf4de60ad08fb5d3aed";

let output = document.getElementById("output-container")
let btn = document.getElementById('btn')

let input = document.getElementById('input')



let getWeather = () => {
  let city = input.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  input.value = ''
  fetch(url)
    .then((response)=> response.json())
    .then( (data) => {
      console.log(data)
      output.innerHTML = `
        <h2 class="city-name">${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1 class="temp">${data.main.temp}&#176;</h1>`
    })
    .catch(()=>{
      output.innerHTML = `<h3 class="msg"> City not found</h3>`
    })
}








btn.addEventListener("click", getWeather)