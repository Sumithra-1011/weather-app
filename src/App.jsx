

import { useState } from "react";
import search from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import drizzlecIcon from "./assets/drizzle.png";
import humidityicon from "./assets/humidity.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import windicon from "./assets/wind.png";

const WeatherDetails = ({ weatherimg, temp, city, counter, lat, log,humidity,wind }) => {
  return (
    <div>
      <div className="weathericon">
        <img src={weatherimg}></img>
      </div>
      <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="counter">{counter}</div>
      <div className="lat-log">
        <div className="lat">
          <span>Latitude</span>
          <span style={{marginTop:"5px"}}>{lat}</span>
        </div>
        <div className="log">
          <span>Longitude</span>
          <span style={{marginTop:"5px"}}>{log}</span>
        </div>
      </div>
      <div className="humidity-wind">
        <div className="humidity-icon">
          <img src={humidityicon}></img>
          <div style={{marginTop:"5px"}}>{humidity} %</div>
          <div style={{marginTop:"5px"}}>Humidity</div>
        </div>
        <div className="humidity-icon">
          <img src={windicon}></img>
          <div style={{marginTop:"5px"}}>{wind} Km/h</div>
          <div style={{marginTop:"5px"}}>Wind</div>
        </div>
      </div>
    </div>
  );
};

export const Weather = () => {
  const [weatherimg, setWeatherimg] = useState(clearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("salem");
  const [counter, setCounter] = useState("India");
  const [lat, setlat] = useState("0");
  const [log, Setlog] = useState("0");
  const[humidity,sethumidity]=useState(0)
  const[wind,setwind]=useState("0")
  const[text,setText]=useState("chennai")
  const[load,setLoad]=useState(false)
  const[citynotfound,setCitynotfound]=useState(false)
  const[error,setError]=useState(null)

  const weatherMap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":clearIcon,
    "02n":clearIcon,
    "03n":drizzlecIcon,
    "03d":drizzlecIcon,
    "04d":drizzlecIcon,
    "03n":drizzlecIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  }

  const searchapi =async()=>{
    setLoad(true)
    let url= `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=402a78c49ee3fac741f54230291e4030&units=metric`;
    try{
      let res=await fetch(url)
      let data= await res.json()
      console.log(data)
      if(data.cod==="404"){
        setCitynotfound(true)
        setLoad(false)
        return
      }
      setCity(data.name)
      setTemp(Math.floor(data.main.temp))
      setCounter(data.sys.country)
      sethumidity(data.main.humidity)
      setwind(data.wind.speed)
      setlat(data.coord.lat)
      Setlog(data.coord.lon)
      const weathericoncode=data.weather[0].icon
      setWeatherimg(weatherMap[weathericoncode]||clearIcon)
      setCitynotfound(false)
    }catch(error){
      console.log(error.message)
      setError("An error occurred")
    }finally{
      setLoad(false)
    }
  }
  const handleCity=(e)=>{
    setText(e.target.value)
  }
  const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
      searchapi()
    }
  }

  return (
    <>
      <div className="container">
        <div className="input-group">
          <input placeholder="Search city name" onChange={handleCity} value={text} onKeyDown={handleKeyDown}></input>
          <div className="search-img">
            <img src={search} onClick={()=>searchapi()}></img>
          </div>
        </div> 
       
        {load && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {citynotfound && <div className="cit-not-found">City not found</div>}
        {!load && !citynotfound && <WeatherDetails
          weatherimg={weatherimg}
          temp={temp}
          city={city}
          counter={counter}
          lat={lat}
          log={log}
          humidity={humidity}
          wind={wind}
        />}
      </div>
    </>
  );
};
  
