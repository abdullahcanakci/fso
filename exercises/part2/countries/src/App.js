import React, { useState, useEffect } from 'react';
import axios from 'axios'

const CountryDetailed = ({ country, weather }) => {
  const langs = country.languages.map((lang, i) => <li key={i}>{lang.name}</li>)
  console.log(weather)
  
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>{langs}</ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} />
      <h2>Weather in {country.capital}</h2>
      <h3>temperature: </h3>
      <p>{weather.main.temp} Celsius</p>

      <h3>wind: </h3>
      <p>{weather.wind.speed} kph direction {weather.wind.deg}</p>
    </div>
  )
}

const CountryListItem = ({ country, onClick }) => {
  return (
    <div>
      <p>{country.name}</p>
      <button id={country.numericCode} onClick={onClick}>show</button>
    </div>
  )
}

const CountryList = ({ countries, onClick }) => {
  if (countries.length === 1) {
    return (
      <div>
        <CountryDetailed country={countries[0]} />
      </div>
    )
  }

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  const countryViews = countries.map(
    country => <CountryListItem key={country.numericCode} country={country} onClick={onClick} />
  )


  return (
    <div>
      {countryViews}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [weatherInfo, setWeatherInfo] = useState(
    {
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 289.92,
        "pressure": 1009,
        "humidity": 92,
        "temp_min": 288.71,
        "temp_max": 290.93
      },
      "wind": {
        "speed": 0.47,
        "deg": 107.538
      },
      "clouds": {
        "all": 2
      },
      "dt": 1560350192,
      "sys": {
        "type": 3,
        "id": 2019346,
        "message": 0.0065,
        "country": "JP",
        "sunrise": 1560281377,
        "sunset": 1560333478
      },
      "timezone": 32400,
      "id": 1851632,
      "name": "Shuzenji",
      "cod": 200
    })

  const [filter, setFilter] = useState('')
  const [idFilter, setIdFilter] = useState('-1')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const filterCountries = (event) => {
    setIdFilter('-1')
    setFilter(event.target.value.toLowerCase())
  }

  const onCountrySelect = (event) => {
    const id = event.target.getAttribute('id')
    console.log(`Selected country is ${id}`)
    setIdFilter(event.target.getAttribute('id'))
  }

  const filteredCountries = () => {

    if (idFilter !== '-1') {
      return countries.filter(e => e.numericCode === idFilter)
    }
    return countries.filter(e => e.name.toLowerCase().indexOf(filter) !== -1)
  }

  const f = filteredCountries()
  const countryView = () => {
    if (f.length === 1) {
      const country = f[0]
      return <CountryDetailed country={country} weather={weatherInfo} />
    }
    return <CountryList countries={f} onClick={onCountrySelect} />
  }

  return (
    <div>
      <div> find countries:
        <input onChange={filterCountries} />
      </div>
      <>{countryView()}</>
    </div>
  );
}

export default App;
