import { GetHour, getTommorowDate } from "./components/Date";
import { Input } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "./assets/search";

function App() {
  const [CurrentWeatherData, setCurrentWeatherData] = useState([]); // Tableau avec les données de la meteo actuelle
  const [currentCity, setCurrentCity] = useState("Paris"); // Ville actuelle
  const [inputCity, setInputCity] = useState(""); // Ville saisie dans l'input

  const fetchCurrentWeather = async (city) => {
    try {
      const reponse = await fetch(
        `${import.meta.env.VITE_URL}/weather?q=${city}&units=metric&lang=fr&${import.meta.env.VITE_KEY}` // Lien de l'api pour la meteo actuelle : https://openweathermap.org/current
      );
      const data = await reponse.json();
      // Recuperer la température, le renssenti, l'humidité, la ville, le pays, la visibilité, le temps, le vent et l'icône correspondant au temps actuelle
      setCurrentWeatherData({
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: Math.round(data.main.humidity),
        location: data.name,
        country: data.sys.country,
        visibility: data.visibility,
        description: data.weather[0].description,
        wind: Math.round(data.wind.speed),
        icon: data.weather[0].icon,
      });
    } catch (error) {
      console.log("Veuillez réessayer");
    }
  };

  const [DailyData, setDailyWeatherData] = useState([]); // Tableau avec la meteo du lendemain toutes les 3 heures

  const fetchDailytWeather = async (city) => {
    try {
      const reponse = await fetch(
        `${import.meta.env.VITE_URL}/forecast?q=${city}&units=metric&lang=fr&${
          import.meta.env.VITE_KEY
        }` // Lien de l'api pour les prévisions météos toutes les 3 heures : https://openweathermap.org/api/hourly-forecast
      );
      const data = await reponse.json();
      const tommorowDate = getTommorowDate(); // Fonction pour pour obtenir la date du lendemain
      const dailyList = data.list.filter((item) =>
        item.dt_txt.includes(`${tommorowDate}`)
      ); // Filtrer le tableau pour récuperer les pévisions du lendemain
      setDailyWeatherData(dailyList); // Donnée récupérer après le filtre
    } catch (error) {
      console.log("Veuillez réessayer");
    }
  };

  // Prévision de la ville actuelle
  useEffect(() => {
    fetchDailytWeather(currentCity);
    fetchCurrentWeather(currentCity);
  }, [currentCity]);

  const handleChange = (event) => {
    setInputCity(event.target.value); // Valeur de l'input
  };
  
  
  const handleClick = () => {
    setCurrentCity(inputCity); // Met à jour la ville saisie
  };
  console.log(handleClick);

  return (
    <>
      <div>
        {/* ------------------- Header ------------------- */}
        <header className="w-full py-3 glasseffect mb-5 flex flex-col justify-center items-center ">
          <p className="m-2">
            {CurrentWeatherData.location}, {CurrentWeatherData.country}
          </p>
          <div className="w-72 flex items-center">
            {/* Champs pour écrire une ville */}
            <Input
              className="text-black"
              type="text"
              label="Entrer une ville"
              value={inputCity}
              onChange={handleChange}
            />
            <span
              className="border w-5 -m-8 hover:cursor-pointer z-10"
              onClick={handleClick}
              >
              <SearchIcon />
            </span>
          </div>
          {!handleChange && <p>Merci d'entrer une ville</p>}

        </header>

        {/* ------------------- Main ------------------- */}
        <main className="px-8">
          {/* Meteo actuel */}
          <div className="flex justify-between m:flex-col">
            {/* Premiere section de gauche : Affiche l'heure, le temps, la température et le ressenti actuel */}
            <section className="flex flex-col justify-around glasseffect h-64 w-[45%] mb-10 m:w-full m:mb-4 rounded-md p-8">
              <GetHour />
              <div className="flex justify-around items-center">
                <span className="bg-blue-100 rounded-md">
                  <img
                    src={`http://openweathermap.org/img/wn/${CurrentWeatherData.icon}.png`} // Affichage de l'icône correspondant au temps actuelle : https://openweathermap.org/weather-conditions
                    alt={CurrentWeatherData.description}
                  />
                </span>
                <p className="text-2xl">{CurrentWeatherData.temperature}°C</p>
              </div>
              <p>Ressenti de {CurrentWeatherData.feelsLike} °C</p>
              <p className="text-lg capitalize">{CurrentWeatherData.description}</p>
            </section>

            {/* Seconde section de droite : Affiche le vent, l'humidité et la visibilité */}
            <section className="flex justify-between items-center glasseffect h-64 m:h-auto w-[45%] m:w-full m:mb-10 rounded-md p-8 text-lg">
              <div className="text-center w-20">
                <p>Vent</p>
                <p>{CurrentWeatherData.wind} km/h</p>
              </div>
              <div className="text-center w-20">
                <p>Humidité</p>
                <p>{CurrentWeatherData.humidity} %</p>
              </div>
              <div className="text-center w-20">
                <p>Visibilité</p>
                <p>{CurrentWeatherData.visibility} m</p>
              </div>
            </section>
          </div>

          {/* Meteo de deamin par heure : Affichant l'heure en le convertisant en objet Date, l'icône et la température*/}
          <div className="flex flex-col justify-around glasseffect w-full h-64 mb-6 rounded-md p-6">
            <p>Demain</p>
            <div className="flex gap-5 justify-between overflow-x-scroll">
              {DailyData.map((data, index) => (
                <div
                  key={index}
                  className="h-40 bg-blue-100 rounded-md flex flex-col justify-around items-center"
                >
                  <p>{new Date(data.dt_txt).getHours()}h</p>
                  <span className="w-24 flex justify-center">
                    <img
                      src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} // Affichage de l'icône correspondant au temps actuelle : https://openweathermap.org/weather-conditions
                      alt={data.weather[0].description}
                    />
                  </span>
                  <p>{Math.round(data.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
