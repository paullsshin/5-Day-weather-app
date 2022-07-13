const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-item");
const timeZone = document.getElementById("time-zone");
const country = document.getElementById("country");
const weatherForcecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const API_KEY = "46f5b7948f56301b7d36b6dc5f891e21"

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursin12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? "PM" : "AM"

    timeEl.innerHTML = hoursin12HrFormat + ":" + minutes + " " + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ", " + date + " " + months[month]
}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`)
        .then (res => res.json())
        .then (data =>{
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData (data) {
    let {humidty, pressure, sunrise, sunset, wind_speed} = data.current;

    currentWeatherItemsEl.innerHTML =
`<div class="weather-item">
    <div>Humidty</div>
    <div>${humidty}%</div>
<div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
</div>
<div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise).format("HH:mm a")}</div>
</div>
<div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset).format("HH:mm a")}</div>
</div>


`;
}