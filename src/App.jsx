import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Weather from "./components/weather";

function App() {
  const [weatherinfo, setWeatherinfo] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  const API_KEY = "0c43b52a3676342d9ca88fef56a98f41";
  const ImagesWeather = {
    "01n": "bg-[url(/Images/night.jpg)]",
    "01d": "bg-[url(/Images/day.png)]",
    "02n": "bg-[url(/Images/few-clouded-night.jpg)]",
    "02d": "bg-[url(/Images/few-clouded-day.jpg)]",
    "03d": "bg-[url(/Images/scattered-clouds-day.jpg)]",
    "03n": "bg-[url(/Images/scattered-clouds-night.jpg)]",
    "04n": "bg-[url(/Images/clouded-night.jpg)]",
    "04d": "bg-[url(/Images/clouded-day.jpg)]",
    "09d": "bg-[url(/Images/rain-day.jpg)]",
    "09n": "bg-[url(/Images/rain-night.jpg)]",
    "10d": "bg-[url(/Images/rain-day.jpg)]",
    "10n": "bg-[url(/Images/rain-night.jpg)]",
    "11d": "bg-[url(/Images/thunder-day.jpg)]",
    "11n": "bg-[url(/Images/thunder-night.jpg)]",
    "13d": "bg-[url(/Images/snowed-day.jpg)]",
    "13n": "bg-[url(/Images/snowed-night.jpg)]",
    "50d": "bg-[url(/Images/misted-day.jpg)]",
    "50n": "bg-[url(/Images/misted-night.jpg)]",
  };

  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    axios
      .get(url)
      .then(({ data }) => setWeatherinfo(data))
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const keyValue = e.target.searcher.value;

    const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${keyValue}&appid=${API_KEY}`;

    axios
      .get(url2)
      .then(({ data }) => setCountryInfo(data))
      .catch((err) => console.log(err));
  };

  const changeCountry = countryInfo === null ? weatherinfo : countryInfo;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <main
      className={`${
        ImagesWeather[changeCountry?.weather[0].icon]
      } min-h-screen font-lato flex justify-center align-center flex-col items-center px-4 bg-cover`}
    >
      <Weather
        changeCountry={changeCountry}
      />
      <form onSubmit={handleSubmit}>
        <input id="searcher" placeholder="Search Any City <3" className="text-black rounded-1xl my-4 text-[16px] p-1 px-2 outline-none" />
        <button className=" bg-blue-400 text-black rounded-2xl my-4 text-[19px] p-1 px-6">
          Search
        </button>
      </form>
    </main>
  );
}

export default App;
