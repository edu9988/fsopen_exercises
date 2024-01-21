import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'

const getWeather = ( city, countryCode, api_key ) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default getWeather
