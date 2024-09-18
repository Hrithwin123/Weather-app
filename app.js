let button = document.querySelector(".button");
let search = document.querySelector(".search");

let icon = document.querySelector(".icon");

let temphtml = document.querySelector(".temp")
let statehtml = document.querySelector(".state")
let humidityhtml = document.querySelector(".humidity")
let pressurehtml = document.querySelector(".pressure")
let windspeedhtml = document.querySelector(".windspeed")

let box = document.querySelector(".box")



async function weather(city){


    let latlonapi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${"143cf38cf3dc7a721af14647e276c3bb"}`
    let latlondata;
    let weatherdata;
    let lat;
    let lon;

    let temp;
    let state;
    let humidity;
    let pressure;
    let windspeed;
    let latlonresponse;
    let weatherresponse;

    let id;

    try{
        latlonresponse = await fetch(latlonapi)

    }
    catch(error){
        console.log(`${error} while fetching lat-lan`)

    }
    
    if(!latlonresponse.ok){
        console.log("LAT_LON Response wasnt ok ")
    }
    else{
        latlondata = await latlonresponse.json();
        lat = await latlondata[0].lat;
        lon = await latlondata[0].lon;

    }


    let weatherapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=143cf38cf3dc7a721af14647e276c3bb`
    


    try{
        weatherresponse = await fetch(weatherapi)

    }
    catch(error){
        console.log(`${error} while fetching weather details`)
    }


    if(!weatherresponse.ok){
        console.log("WEATHER Response Wasnt ok")
    }
    else{
        weatherdata = await weatherresponse.json();
        temp = weatherdata.main.temp;
        humidity = weatherdata.main.humidity
        pressure = weatherdata.main.pressure
        state = weatherdata.weather[0].main
        windspeed = weatherdata.wind.speed
        id = weatherdata.weather[0].id

    }
    
    console.log(temp)
    console.log(humidity)
    console.log(pressure)
    console.log(state)
    console.log(windspeed)
    console.log(id)

    console.log(weatherdata)

    box.style.visibility = "visible";

    switch(true){

        case(id >= 200 && id < 300):
            icon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`
            break;

        case(id >= 300 && id < 400):
            icon.innerHTMl = `<i class="fa-solid fa-cloud-rain"></i>`
            break;

        case(id >= 500 && id < 600):
            icon.innerHTMl = `<i class="fa-solid fa-cloud-rain"></i>`
            break;

        case(id >= 600 && id < 700):
            icon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`
            break;

        case(id >= 700 && id < 800):
            icon.innerHTML = `<i class="fa-solid fa-wind"></i>`
            break;

        case(id == 800):
            icon.innerHTML = `<i class="fa-solid fa-sun"></i>`
            break;

        case(id >= 801 && id < 810):
            icon.innerHTML = `<i class="fa-solid fa-cloud"></i>`
            break;
        
        default:
            icon.innerHTMl =  `<i class="fa-solid fa-question"></i>`
    
                                         
    }

    temphtml.innerText = `${Math.floor(Number(temp) - 273.15)}℃`;
    statehtml.innerText = `${state}`;
    humidityhtml.innerText = `Humidity : ${humidity}%`;
    pressurehtml.innerText = `Pressure : ${pressure} bar`;
    windspeedhtml.innerText = `Wind : ${windspeed} m/s`



   
}



function run(){
    let value = search.value
    weather(value)

}





button.addEventListener("click",run)

