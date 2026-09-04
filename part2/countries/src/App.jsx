import { useState, useEffect } from 'react'
import countriesService from './services/Countries'
import CountryFilter from './components/CountryFilter'

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
