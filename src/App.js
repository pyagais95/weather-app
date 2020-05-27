import React, {useEffect, useState} from 'react'
import {getCurrentLocationWeather, getWeatherByCity} from './services/weather-service'
import InputComponent from './components/input'
import ButtonComponent from './components/button/'
import getBackgroundColor from './helpers/getBackgroundColor'
import {BLUE, YELLOW, ORANGE} from './consts/backgroundColors'
import Table from 'react-bootstrap/Table'
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

  const getWeather = async (event) => {
    if (city) {
      event.preventDefault()
      const weather = await getWeatherByCity(city)
      setWeather(weather)
    }
    event.preventDefault()
  }

  const adjustTemperature = (event) => {
    const updatedWeather = {...weather}
    updatedWeather.main.temp = event.target.value
    setWeather(updatedWeather)
  }

  return (
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center'
         style={{background: backgroundColor}}>
      <div className='row w-100'>
        <div className='col'/>
        <div className='col-8'>
          <form className='w-100 p-2' onSubmit={getWeather}>
            <div className='input-group d-flex justify-content-start'>
              <InputComponent
                placeholder='City Name'
                type='text'
                value={city}
                onChange={(event) => {
                  setCity(event.target.value)
                }}
                className='w-50 p-1'
              />
              <div className='input-group-append'>
                <ButtonComponent
                  name='search'
                  type='submit'
                  className='btn btn-secondary btn-lg'
                />
              </div>
            </div>
          </form>
          {weather && weather.main ?
            <Table className='table-borderless text-secondary'>
              <tbody>
              <tr>
                <td>Temperature</td>
                <td>{weather.main.temp} &#8451;</td>
              </tr>
              <tr>
                <td>Feels Like</td>
                <td>{weather.main.feels_like} &#8451;</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{weather.main.humidity}  &#37;</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{weather.main.pressure} hpa</td>
              </tr>
              </tbody>
            </Table>
            : <div className='col'>
              <p>City is not found</p>

            </div>
          }
        </div>
        <div className='col'/>
      </div>

      <div className='row fixed-bottom'>
        <div className='col-12 d-flex justify-content-end'>
          <div className='col-4'/>
          <div className='col-4'/>
          <div className='col-4 d-flex flex-column w-100 p-2'>
            <p className='text-secondary'>Adjust Temperature</p>
            <InputComponent
              type='range'
              min='-50'
              max='50'
              value={weather && weather.main ? weather.main.temp : 0}
              id='formControlRange'
              className='form-control-range w-75'
              onChange={adjustTemperature}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
