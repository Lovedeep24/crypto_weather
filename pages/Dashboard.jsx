"use client"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '@/store/slices/dataSlice';
import { WeatherWidget } from '@/components/ui/weather-widget';
export default function Dashboard() {
  const[weatherData,setWeatherData]=useState([]);
  const dispatch = useDispatch();
  const { weather, crypto,news, loading,webCrypto, error } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(fetchData());
    dispatch({ type: 'data/fetchCryptoData' });
  }, [dispatch]);

  useEffect(() => {
    if (weather?.list) {
      const extractedData = weather.list.map(item => ({
        city: item.name,
        temp: item.main.temp,
        time: item.dt,
        weather: item.weather[0].main,
        humidity: item.main.humidity,
      }));
      setWeatherData(extractedData);
    }
  }, [weather]);
  console.log(weatherData);
  console.log("News Data from Redux:", news);
  console.log("Crypto Data from Redux:", crypto);
  console.log("webCrypto Data from Redux:", webCrypto);
  return (
    <div className='border-2 mt-40'>
       <div className="flex justify-center p-8">
      <WeatherWidget 
        width="16rem"
        className="shadow-md" />
    </div>
     {loading && <div>Loading...</div>}
     {error && <div>Error: {error}</div>}
      <div>
        {weatherData.length > 0 ? (
          weatherData.map((data,index) => (
            <div key={index} className="p-2 mb-2 rounded-md  text-black">
              <p>City: {data.city}</p>
              <p>Temperature: {data.temp}°C</p>
              <p>Time: {new Date(data.time * 1000).toLocaleString()}</p>
              <p>Weather: {data.weather}</p>
              <p>Humidity: {data.humidity}%</p>
            </div>
          ))
        ) : (
          <p>No weather data available.</p>
        )}
      </div>
      <h3>Latest News</h3>
      {news && news.length > 0 ? (
        news.map((item, index) => (
          <div key={index} className="p-2 mb-2 rounded-md text-black">
            <a target="_blank" rel="noopener noreferrer">
              <h4>{item.title}</h4>
            </a>
            <p>{item.description}</p>
            <p>Published: {new Date(item.pubDate).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No news data available.</p>
      )}
      <h3>Crypto (API Data)</h3>
{crypto && Array.isArray(crypto) && crypto.length > 0 ? (
  <div>
    {crypto.map((item, index) => (
      <div key={index} className="p-2 mb-2 rounded-md text-black">
        <p>{item.name} ({item.symbol.toUpperCase()}): ${item.current_price.toFixed(2)}</p>
        <p>Market Cap: ${item.market_cap.toLocaleString()}</p>
        <p>24h Change: {item.price_change_percentage_24h.toFixed(2)}%</p>
      </div>
    ))}
  </div>
) : (
  <p>No API-based crypto data available.</p>
)}

<h3>Crypto (WebSocket Data)</h3>
{webCrypto && Object.keys(webCrypto).length > 0 ? (
  <div>
    {Object.entries(webCrypto).map(([key, value]) => (
      <div key={key} className="p-2 mb-2 rounded-md text-black">
        <p>{key.toUpperCase()}: ${parseFloat(value).toFixed(2)}</p>
      </div>
    ))}
  </div>
) : (
  <p>No WebSocket-based crypto data available.</p>
)}
   
    </div>
  );
}
