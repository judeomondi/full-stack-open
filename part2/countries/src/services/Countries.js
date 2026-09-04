import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'


const getAll = () => {
    const url = `${baseUrl}api/all`
    return axios
        .get(url)
        .then(response => response.data)
}

const getByCountryName = (country) => {
    const url = `${baseUrl}api/name/${country}`
    return axios
        .get(url)
        .then(response => response.data)
}

export default {
    getAll,
    getByCountryName
}