import React, { useState } from "react";
import countries from "./../assets/slim-2.json";

const weather = ({ changeCountry }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const countryfind = countries.find((country) => {
    return country.alpha === changeCountry?.sys.country;
  });
  const KelvinToCelsius = (tempKelvin) => {
    return (tempKelvin - 273.15).toFixed(1);
  };

  const KelvinToFarenheit = (tempKelvin) => {
    return (((tempKelvin - 273.15) * 9) / 5 + 32).toFixed(1);
  };

  const handleChangeUnitTemp = () => {
    setIsCelsius(!isCelsius);
  };
  /*console.log({ weatherinfo });*/

  return (
    <section className="text-center">
      <h2 className="text-4xl mb-6 text-white">
        {changeCountry?.name}, {countryfind?.name}
      </h2>

      <section className="grid gap-4 sm:grid-cols-[auto_auto]">
        {/* sección superior */}
        <section className="bg-[#84848450] p-1 rounded-2xl grid grid-cols-[auto_auto] items-center text-white">
          <h4 className="col-span-2 text-2xl mt-4">
            {changeCountry?.weather[0].description}
          </h4>
          <span className="text-8xl">
            {isCelsius
              ? KelvinToCelsius(changeCountry?.main.temp)
              : KelvinToFarenheit(changeCountry?.main.temp)}
            °{isCelsius ? "C" : "F"}
          </span>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${changeCountry?.weather[0].icon}@4x.png`}
            />
          </div>
        </section>

        {/* sección inferior */}
        <section className="bg-[#84848450] p-2 rounded-2xl grid grid-cols-3 item py-4 sm:grid-cols-1 text-white">
          <article className="flex gap-2 items-center">
            <div className="w-[18px]">
              <img src="./windIcon.svg" alt="" />
            </div>
            <span className="text-2xl">{changeCountry?.wind.speed}m/s</span>
          </article>

          <article className="flex gap-2 items-center">
            <div className="w-[18px]">
              <img src="./HumidityIcon.svg" alt="" />
            </div>
            <span className="text-2xl">{changeCountry?.main.humidity}%</span>
          </article>

          <article className="flex gap-2 items-center">
            <div className="w-[18px]">
              <img src="./PressureIcon.svg" alt="" />
            </div>
            <span className="text-2xl">{changeCountry?.main.pressure}hPa</span>
          </article>
        </section>
      </section>
      <button
        onClick={handleChangeUnitTemp}
        className="bg-blue-400 text-white rounded-2xl my-4 text-[19px] p-1 px-6"
      >
        Cambiar a {isCelsius ? "F°" : "C°"}
      </button>
    </section>
  );
};

export default weather;
