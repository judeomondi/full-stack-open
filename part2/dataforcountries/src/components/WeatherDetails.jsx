import weatherService from '../services/WeatherService'
import { useEffect, useState} from 'react'

const WeatherDetails = ({city}) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    weatherService
      .getWeatherData(city)  
      .then(weatherData => {
        setWeather(weatherData)
      }).catch(error => {
        console.log("Error: " + error)
      })
  }, [city])

  return (
    <div>
      <h1>Weather in {city} </h1>
      {weather && <p>Temperature {weather.data[0].temp} Celsius</p>}
      {weather && <p>Wind {weather.data[0].wind_speed} m/s</p>}
    </div>
  )
}

export default WeatherDetails