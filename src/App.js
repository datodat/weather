import React, { useState } from 'react';
// CSS
import './styles.css';
// Axios
import axios from 'axios';

const api = {
  key: 'ff16246dc221a7ef0123b131a111e692',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const App = () => {
  const [searchedCity, setSearchedCity] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if(e.key === 'Enter'){
      axios.get(`${api.base}weather?q=${searchedCity}&units=metric&APPID=${api.key}`)
        .then(res => {
          setSearchedCity('');
          setWeather(res.data);
        })
        .catch(error => console.log(error))
    }
  }

  const dateBuilder = (d) => {
    const months = ['January', 'February', 'March', 'April', 
                    'May', 'June', 'July', 'August', 'September', 
                    'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                  'Thursday', 'Friday', 'Saturday'];
    
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className=
      {
        (typeof weather.main !== 'undefined') ? 
          ((weather.main.temp) > 16 ? 
            'container-warm' : 
            'container') : 
            'container' 
      }>
      <main className='main'>
        {/* Search */}
        <div className='search-div'>
          <input
            type='text'
            placeholder='Search...'
            value={searchedCity}
            onChange={({ target }) => setSearchedCity(target.value)}
            onKeyPress={search}
          />
        </div>
        {/* Location */}
        {(typeof weather.main !== 'undefined') ? 
        (
          <div>
            <div className='location'>
              <div className='location-city'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='location-date'>
                {dateBuilder(new Date())}
              </div>
            </div>
            {/* Weather */}
            <div className='weather'>
              <div className='weather-temp'>
                <div>{Math.round(weather.main.temp)} °C</div>
                <div className='weather-feels-like'>
                  Feels like: {Math.round(weather.main.feels_like)} °C
                </div>
                <div className='weather-wind'>
                  Wind: {Math.round(weather.wind.speed)} km/h
                </div>
              </div>
              <div className='weather-condition'>
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ''}
      </main>
    </div>
  );
}

export default App;