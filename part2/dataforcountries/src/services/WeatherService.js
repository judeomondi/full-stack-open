    import axios from 'axios'

    const api_key = import.meta.env.VITE_SOME_KEY
    const baseUrl = 'http://api.openweathermap.org'

    const getLocationData = (city) => {
        const url = `${baseUrl}/geo/1.0/direct?q=${city}&appid=${api_key}`
        return axios
            .get(url)
            .then(response => response.data)
    }

    const getWeatherData = (city) => {
        console.log(city)
        return getLocationData(city).then(locationData => getWeatherDataHelper(locationData[0].lat, locationData[0].lon))
    }

    const getWeatherDataHelper = (lat, lon) => {
        const url = `${baseUrl}/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid=${api_key}`
        return axios
            .get(url)
            .then(response => response.data)
    }

    export default {
        getWeatherData
    }

