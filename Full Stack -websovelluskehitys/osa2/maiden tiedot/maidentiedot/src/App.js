import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'

const SingleCountryData = (props) => {

  const countries = props.countries;
  console.log("singlecountrydata");

  const weatherAccessKey = '3d54d62673b2074f6713cda7a32753d6'
  let weatherLocation = 'Helsinki'

  const [weatherData, setWeatherData] = useState('');
  const imgURL = countries[0].flag;
 

  const getWeatherData = (url) => {
    console.log("getting weather data!");
    return axios.get(url)
    }

  

  if(weatherData === ''){
    weatherLocation = countries[0].capital;
    const weatherReqURL = `http://api.weatherstack.com/current?access_key=${weatherAccessKey}&query=${weatherLocation}`;
   

    getWeatherData(weatherReqURL)
    .then(result => {
      setWeatherData(result.data);
      console.log("weatherdata: ", result.data.current);
    })
  } 

  if(weatherData === ''){
    return(
      <div> loading data... </div>
    )
    
  }

  return(
    <div> 
      <h1> {countries[0].name} </h1>
      <p> capital {countries[0].capital}</p>
      <p> population {countries[0].population}</p>     
      <h2> languages </h2>
      <ul>
        {countries[0].languages.map(language => <li> {language.name} </li>)}
      </ul>
      
      <img src={imgURL} alt="imagetext" width="20%"/>
     
      <h2> Weather in {countries[0].capital}</h2>
      <p> <b>temperature: </b> {weatherData.current.temperature} Celcius </p>
      <img src={weatherData.current.weather_icons[0]} alt="imagetext"></img>
      <p> <b> wind: </b> {weatherData.current.wind_speed} kph </p>
  
      
    </div>
  )
}





const CountryData = (props) => {

  const countries = props.countries;
  console.log("props: ", props);


  if(countries.length > 0 && countries.length !== 1 && countries.length < 10){
    console.log("countrydataprops: ", props.countries[0]);
    return(
      <div>
  

        {countries.map((country, index) => <div key={country.name}> {country.name} <button onClick={() => props.setFilter(country.name)}> show </button> </div>)}
  
      </div>
  
    )

  } else if(countries.length === 1){

    console.log("one country!");
    return(
      <div> 
  
        <SingleCountryData countries={countries} />

      </div>
     
    )
   
  } else {
    return(
      <div> too many matches, specify another filter. </div>
    )
  }

}


function App() {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');


  const countriesToShow = () => {
    if(filter === ''){
      //console.log("allcountries: ", countries);
      return countries;
    } else {
      const filteredCountries = countries.filter(country => subStringCheck(country.name, filter))
      //console.log("filteredcountries: ", filteredCountries);
      return filteredCountries;
    }


  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    //console.log("filtteri: ", filter);

  }

  useEffect(() => {
    //console.log("efekti");
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log("promise fulfilled!")
        //console.log("response data:", response.data);
        setCountries(response.data);
      })

  }, [])

  const subStringCheck = (string, substring) => {

    if(string.includes(substring)){
      //console.log("string:", string, "substring:", substring)
      //console.log("substring inside string");
      return true;
    } else {
      //console.log("no substring inside string");
      return false;
    }

  }

  return (
    <div>
      find countries 
      <input value={filter} onChange={handleFilterChange} />

      <CountryData countries={countriesToShow()} setFilter={setFilter} />
    </div>
  );
}

export default App;
