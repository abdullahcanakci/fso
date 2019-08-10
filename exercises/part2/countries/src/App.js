import React, { useState, useEffect } from 'react';
import axios from 'axios'

const CountryDetailed = ({ country, weatherInfo }) => {

  const langs = country.languages.map((lang, i) => <li key={i}>{lang.name}</li>)
  console.log(weatherInfo)

  const weatherBody = () => {
    if (weatherInfo.main !== undefined) {
      return (
        <div>
          <h2>Weather in {country.capital}</h2>
          <h3>temperature: </h3>
          <p>{weatherInfo.main.temp} Celsius</p>

          <h3>wind: </h3>
          <p>{weatherInfo.wind.speed} kph direction {weatherInfo.wind.deg}</p>
        </div>
      )
    }
    return (<p>No weather data avaible | Weather information is not avaible in auto display, please select country by buttons</p>)
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>{langs}</ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} />
      {weatherBody()}
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
  const [weatherInfo, setWeatherInfo] = useState({})
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
    const country = countries.find(c => c.numericCode === id)
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha3Code}&appid=77217d112d239bc7f904ebaa4f2f9382&units=metric`)
      .then(response => {
        setWeatherInfo(response.data)
      }
      )
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
      return <CountryDetailed country={country} weatherInfo={weatherInfo} />
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
