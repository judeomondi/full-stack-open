import CountryDetails from "./CountryDetails"
import {useState} from 'react'

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

export default CountryFilter