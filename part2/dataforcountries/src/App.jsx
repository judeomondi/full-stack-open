import { useState, useEffect } from 'react'
import countriesService from './services/Countries'
import weatherService from './services/WeatherService'

const CountryFilter = ({filteredCountries}) => {

  const [selectedCountryDetails, setSelectedCountryDetails] = useState(null)

  if(filteredCountries.length === 0){
    return
  }

  if(filteredCountries.length > 10){
    return <p>Too many matches, specify another filter</p>
  }

  if(filteredCountries.length < 10 && filteredCountries.length > 1){
    return (
      <div>
        {filteredCountries.map((country) =>
           <div key={country.cca3}>{country.name.common} <button onClick={() => setSelectedCountryDetails(country)}>show</button> <br/>
            {selectedCountryDetails === country && <CountryDetails country={country}/>}
            </div>)}   
      </div>
    )
  }

  const country = filteredCountries[0]
  return <CountryDetails country={country}/>
  
}

const CountryDetails = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h1>Languages</h1>
      <ul>{Object.entries(country.languages).map(([code, name]) => (<li key={code}>{name}</li>))}</ul>
      <img src={country.flags.png} alt={country.name.common} />
      <WeatherDetails city={country.capital}/>
    </div>
  )
}

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

const App = () => {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')

  const hook = () => {
    countriesService.getAll()
    .then(returnedData => {
        setCountries(returnedData)
      })
      .catch(error => {
        console.log('Exception caught' + error)
      })
  }

  useEffect(hook, [])

  const handleOnChange = (event) => {
    setCountry(event.target.value)
  }

  const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(country.toLocaleLowerCase()))
 
  return (
   <div>
    {console.log(filteredCountries)}
    <p>find countries <input value={country} onChange={handleOnChange}/></p>
    <CountryFilter filteredCountries={filteredCountries}/>
   </div>
  )
}

export default App
