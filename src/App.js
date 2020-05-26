import React, {useEffect, useState} from 'react'
import {getCurrentLocationWeather, getWeatherByCity} from './services/weather-service'
import InputComponent from './components/input'
import ButtonComponent from './components/button/'
import getBackgroundColor from './helpers/getBackgroundColor'
import {BLUE, YELLOW, ORANGE} from './consts/backgroundColors'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'


const App = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude.toString()
      const long = position.coords.longitude.toString()
      const weather = await getCurrentLocationWeather(lat, long)
      setWeather(weather)
    })
  }, [])

  useEffect(() => {
    if (weather && weather.main) {
      const temp = weather.main.temp
      let backgroundColor = ''
      let percent = 0

      switch (true) {
        case temp <= -10:
          setBackgroundColor('rgb(0,255,255)')
          break
        case temp > -10 && temp < 10:
          percent = ((temp - (-10)) * 100 / 20) / 100
          backgroundColor = getBackgroundColor(percent, BLUE, YELLOW)
          setBackgroundColor(`${backgroundColor}`)
          break
        case temp === 10:
          setBackgroundColor('rgb(255, 247, 0)')
          break
        case temp > 10 && temp <= 30:
          percent = ((temp - (10)) * 100 / 20) / 100
          backgroundColor = getBackgroundColor(percent, YELLOW, ORANGE)
          setBackgroundColor(`${backgroundColor}`)
          break
        case temp > 30:
          setBackgroundColor('rgb(255, 140, 0)')
          break
        default:
          setBackgroundColor('rgb(255,255,255)')
      }
    }
  }, [weather])


  const getWeather = async () => {
    const weather = await getWeatherByCity(city)
    setWeather(weather)
  }

  return (
    <div className='container-fluid' style={{background: backgroundColor}}>
      <div className='col'/>
      <div className='col-8'>
        <div className='row'>
          <div className='col'>
            <div className='row'>
              <InputComponent
                placeholder='assad'
                type='text'
                value={city}
                onChange={(event) => {
                  setCity(event.target.value)
                }}
              />
              <ButtonComponent
                name='submit'
                onClick={getWeather}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'/>
          <div className='col'>
            {
              weather && weather.main ?
                <div>
                  {weather.main.temp}
                </div>
                : null
            }
          </div>
          <div className='col'/>
        </div>
      </div>
      <div className='col'/>
    </div>
  );
}

export default App;
