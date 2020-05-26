import { API_KEY } from '../consts/apiKey'

const getCurrentLocationWeather = async (lat, long) => {
  console.log(lat, 'lat', long, long)
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`,)
    return await response.json()
  } catch (e) {
   console.log(e, 'error')
  }
}

const getWeatherByCity = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,)
    return await response.json()
  } catch (e) {
    console.log(e)
  }
}

export  {
  getCurrentLocationWeather,
  getWeatherByCity
}