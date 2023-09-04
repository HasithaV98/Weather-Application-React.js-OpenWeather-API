import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'Colombo',
        humidity: 10,
        speed: 2,
        image: '',
      });
      const [name, setName] = useState('');
     
      const [forecastData, setForecastData] = useState([]);
      const [showFullWeek, setShowFullWeek] = useState(false);
      
      
    
      useEffect(() => {
        
        const fetchColomboWeather = () => {
          const colomboApiUrl = `your open weather api key and url`;
    
          axios
            .get(colomboApiUrl)
            .then((res) => {
              let imagePath = '';
              if (res.data.weather[0].main === 'Clouds') {
                imagePath = '/Images/sun.png';
              } else if (res.data.weather[0].main === 'Clear') {
                imagePath = '/Images/sun2.png';
              } else if (res.data.weather[0].main === 'Rain') {
                imagePath = '/Images/rain.png';
              } else if (res.data.weather[0].main === 'Drizzle') {
                imagePath = '/Images/drizzle.png';
              } else if (res.data.weather[0].main === 'Mist') {
                imagePath = '/Images/mist.png';
              } else {
                imagePath = '/Images/sun.png';
              }
              console.log(res.data);
              setData({
                celcius: res.data.main.temp,
                name: res.data.name,
                humidity: res.data.main.humidity,
                speed: res.data.wind.speed,
                image: imagePath,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        };
    
        fetchColomboWeather();
      }, []);
    
      const handleClick = () => {
        if (name !== '') {
          const currentApiUrl = `your open weather api key and url`;
          const forecastApiUrl = `your open weather api key and url`;
    
          
          Promise.all([axios.get(currentApiUrl), axios.get(forecastApiUrl)])
            .then(([currentRes, forecastRes]) => {
              let imagePath = '';
              if (currentRes.data.weather[0].main === 'Clouds') {
                imagePath = '/Images/sun.png';
              } else if (currentRes.data.weather[0].main === 'Clear') {
                imagePath = '/Images/sun2.png';
              } else if (currentRes.data.weather[0].main === 'Rain') {
                imagePath = '/Images/rain.png';
              } else if (currentRes.data.weather[0].main === 'Drizzle') {
                imagePath = '/Images/drizzle.png';
              } else if (currentRes.data.weather[0].main === 'Mist') {
                imagePath = '/Images/mist.png';
              } else {
                imagePath = '/Images/sun.png';
              }
    
              setData({
                celcius: currentRes.data.main.temp,
                name: currentRes.data.name,
                humidity: currentRes.data.main.humidity,
                speed: currentRes.data.wind.speed,
                image: imagePath,
              });
    
              const forecastData = forecastRes.data.list
                .filter((item) => item.dt_txt.includes('12:00:00')) 
                .map((item) => ({
                  date: item.dt_txt.split(' ')[0],
                  time: item.dt_txt.split(' ')[1],
                  celcius: item.main.temp,
                  humidity: item.main.humidity, // Humidity for the day
                  windSpeed: item.wind.speed * 3.6, // Convert wind speed to km/h
                  image: getImageUrl(item.weather[0].main),
                  description: item.weather[0].description,
                  dayOfWeek: getDay(item.dt_txt.split(' ')[0]),
                }));
    
              setForecastData(forecastData);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
    
      const toggleFullWeek = () => {
        setShowFullWeek(!showFullWeek);
      };
    
      const getImageUrl = (weatherType) => {
        let imageUrl = '';
    
        switch (weatherType) {
          case 'Clouds':
            imageUrl = '/Images/sun.png';
            break;
          case 'Clear':
            imageUrl = '/Images/sun2.png';
            break;
          case 'Rain':
            imageUrl = '/Images/rain.png';
            break;
          case 'Drizzle':
            imageUrl = '/Images/drizzle.png';
            break;
          case 'Mist':
            imageUrl = '/Images/mist.png';
            break;
          default:
            imageUrl = '/Images/sun.png';
        }
    
        return imageUrl;
      };
    
      const getDay = (dateString) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dateObj = new Date(dateString);
        const dayOfWeek = daysOfWeek[dateObj.getDay()];
        return dayOfWeek;
      };
    
  return (
    
    <div className='main'>
      <br></br>
      
      <div >
        <h2 className='welcome-text'>Welcome</h2>
      </div>
      <div >
        <img src='Images/profile-user1.png' alt='User Profile'className='user-profile' />
      </div>

        <div className='background-image'>
      <div>
        <input type='text' placeholder='Search City' className='input' value={name} onChange={(e) => setName(e.target.value)} />
        <button className='button' onClick={handleClick}>Search</button>
        
        <div className='main-weather'>
        <img className='weather-image' src={data.image} alt=''/>
        <div className="temp">{data.celcius}°</div>
            <img src='Images/pin2.png' alt=''/>
            <h3 className='h3-text'>{data.name}</h3>
        </div>
        <div className='current-date-time'>
        <h3>{new Date().toLocaleTimeString()}</h3>
        <p>{new Date().toLocaleDateString()} </p>
        </div>
      </div>
    </div>
    <div className='left-div'>
        <div className='main-humidity'>Humidity</div>
        <div className="description1">{data.humidity}% </div>
        <div className='temp-text'>Temperature</div>
        <div className="temp1">{data.celcius}°</div>
        <div className='wind-text'>Wind</div>
        <div className="description">{data.speed} km/h </div>
            
    </div>
    <div className='right-div'>
    {forecastData.length > 0 && (
        
          
            
             
            <><div className="cardBody">
            {showFullWeek
              ? forecastData.map((item, index) => (
                <div key={index} className="forecastItem">
                  <div className="forecastDate">
                     {item.date},{item.dayOfWeek}
                  </div>
                  <p className='hum-text'>Humidity</p>
                  <div className="forecastHumidity">
                    {item.humidity !== undefined ? `${item.humidity}%` : 'N/A'}
                  </div>
                  <p className='temp-text1'>Temperature</p>
                  <div className="forecastTemperature">{item.celcius}°C</div>
                  <p className='wind-text1'>Wind</p>
                  <div className="forecastWind">
                    {' '}
                    {item.windSpeed !== undefined ? `${item.windSpeed.toFixed(2)} km/h` : 'N/A'}
                  </div>
                  
					<img src={item.image} alt={item.description} className="side-image" />
				
                  
                  

                </div>
              ))
              : forecastData.slice(0, 3).map((item, index) => (
                <div key={index} className="forecastItem">
                  <div className="forecastDate">
                    {item.date},{item.dayOfWeek}
                  </div>
                  <p className='hum-text'>Humidity</p>
                  <div className="forecastHumidity">
                    {item.humidity !== undefined ? `${item.humidity}%` : 'N/A'}
                  </div>
                  <p className='temp-text1'>Temperature</p>
                  <div className="forecastTemperature">{item.celcius}°C</div>
                  <p className='wind-text1'>Wind</p>
                  <div className="forecastWind">
                    {' '}
                    {item.windSpeed !== undefined ? `${item.windSpeed.toFixed(2)} km/h` : 'N/A'}
                  </div>
                  
					<img src={item.image} alt={item.description} className="side-image" />
				
                </div>
              ))}
          </div><button className="seeMoreButton" onClick={toggleFullWeek}>
              {showFullWeek ? 'See Less' : 'View More'}
            </button></>
          
          
        
      )}
    </div>
    </div>
  );
}

export default Home;
