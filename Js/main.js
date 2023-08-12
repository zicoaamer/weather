var forecastContent = document.querySelector(".forecast-content");
var forecastFirstHeader = document.querySelector(".current .forecast-header");
var forecastSecondtHeader = document.querySelector(".tomorrow .forecast-header");
var forecastThirdHeader = document.querySelector(".after-tomorrow .forecast-header");
var tomorrowContent = document.querySelector(".tomorrow .forecast-content");
var afterTomorrowContent = document.querySelector(".after-tomorrow .forecast-content");
async function getData(city = 'cairo'){
    var data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1a33e556d0dd4a9780a222903230308&q=${city}&days=3`);
    data = await data.json();
    console.log(data);
    
    //Date
    const today = new Date();
    const options = { weekday: 'long' };
    const dayOfToday = today.toLocaleString('en-US', options);
    const secDay = new Date(today);
    secDay.setDate(today.getDate() + 1);
    const dayOfSecDay = secDay.toLocaleString('en-US', options);
    const thirdDay = new Date(today);
    secDay.setDate(thirdDay.getDate() + 2);
    const dayOfThirdDay = thirdDay.toLocaleString('en-US', options);
    
    const windDirection = data.current.wind_dir.toLowerCase();
    const direction = 
    windDirection === 'n' ? "North" :
    windDirection === 'e' ? "East" :
    windDirection === 'w' ? "West" :
    windDirection === 'c' ? "Cost" : "Unknown";
    forecastContent.innerHTML = `
    <p>${data.location.name}</p>
    <div class="celsius d-flex flex-row align-items-center justify-content-evenly">
    <p class="fs-0 text-white">${data.current.temp_c}</p>
    <div class="w-25" class="px-2"><img class="w-100" src="${data.current.condition.icon}"></div>
    </div>
    <p class="mainColor text-center">${data.current.condition.text}</p>
    <div class="forend d-flex flex-row justify-content-center">
    <div>
    ${data.current.humidity}%
    </div>
       <div>
       ${data.current.wind_kph}km/h
       </div>
       <div>
       ${direction}
       </div>
       </div>
       `;
       const day = today.getDate();
       const month = today.toLocaleString('default', { month: 'long' });
       
       forecastFirstHeader.innerHTML = `
       <p>${dayOfToday}</p>
       <p>${day} ${month}</p>
       `;
       forecastSecondtHeader.innerHTML = `<p>${dayOfSecDay}</p>`;
       forecastThirdHeader.innerHTML = `<p>${dayOfThirdDay}</p>`;

       function generateWea(src, max, min, text){
        return `
        <div class="pt-3 minusTop"><img class="w-25"src="${src}" alt="icon"></div>
        <p class="pt-5 fs-1 fw-bold text-white minusTopX">${max}</p>
        <p class="minusTop">${min}</p>
        <p class="mainColor pt-5">${text}</p>
        `;
    };
    tomorrowContent.innerHTML = generateWea(data.forecast.forecastday[0].day.condition.icon, data.forecast.forecastday[1].day.maxtemp_c, data.forecast.forecastday[1].day.mintemp_c,data.forecast.forecastday[1].day.condition.text);
    afterTomorrowContent.innerHTML = generateWea(data.forecast.forecastday[0].day.condition.icon, data.forecast.forecastday[2].day.maxtemp_c, data.forecast.forecastday[2].day.mintemp_c,data.forecast.forecastday[2].day.condition.text);
    }
    getData("cairo");
    
    async function search(city) {
        var srch = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
        if (srch.ok && 400 != srch.status) {
            var a = await srch.json();
            getData(a.location.name);
        }
    }
    document.getElementById("search").addEventListener("keyup", a =>{
        search(a.target.value);
    })