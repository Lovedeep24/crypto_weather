"use client"
import React, { useEffect, useState } from 'react';
import { PricingCard } from "@/components/ui/dark-gradient-pricing"
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '@/store/slices/dataSlice';
import { WeatherWidget } from '@/components/ui/weather-widget';
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
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
  
  const Notification = ({ name, description, icon, color, time }) => {
    return (
      <figure
        className={cn(
          "relative mx-auto min-h-fit w-full max-w-[70%] cursor-pointer overflow-hidden rounded-2xl p-4",
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <div className="flex size-13 items-center justify-center rounded-2xl" style={{ backgroundColor: "#FF3D71" }}>
            <span className="text-2xl"> 💬</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
              <span className="text-sm sm:text-lg">{name}</span>
           
              <span className="text-sm text-gray-500">{time}</span>
            </figcaption>
            <p className="text-md w-full font-normal text-gray-700">{description}</p>
          </div>
        </div>
      </figure>
    );
  };
  const getPrice = (item) => {
    if (webCrypto && webCrypto[item.name.toLowerCase()]) {
      return parseFloat(webCrypto[item.name.toLowerCase()]).toFixed(2);
    }
    return item.current_price.toFixed(2);
  };
  
  return (
    <div className=' mt-40 flex flex-col gap-15'>
     {loading && <div>Loading...</div>}
     {error && <div>Error: {error}</div>}
      <div className='flex flex-col w-full gap-7 items-center justify-center'>
        <h1 className='font-semibold text-3xl'>Weather Information</h1>
          <div className='flex gap-3 items-center justify-center'>
          {weatherData.length > 0 ? (
            weatherData.map((data,index) => (
              <div key={index} className="p-2 mb-2 rounded-md  text-black">
               <WeatherWidget 
                width="16rem"
                className="shadow-md"
                data={data} />
            </div>
          ))
           ) : (
            <p>No weather data available.</p>
          )}
        </div>
    </div>
     

  <div className='flex flex-col w-full items-center justify-center'>
    <h1 className='font-semibold text-3xl'>Live Crypto Tracker</h1>
    {webCrypto && Object.keys(webCrypto).length > 0 ? (
        <div>
          {Object.entries(webCrypto).map(([key, value]) => (
            <div key={key} className="p-2 mb-2 rounded-md text-black">
              {/* <p>{key.toUpperCase()}: ${parseFloat(value).toFixed(2)}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <p>No Real-time crypto data available, kindly Refresh</p>
      )}
      {crypto && Array.isArray(crypto) && crypto.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {crypto.map((item, index) => (
            <div key={index} className="p-2 mb-2 rounded-md text-black">
              <PricingCard
                cryptoName={item.name}
                price={getPrice(item)}
                benefits={[
                  { text: `Market Cap: ${item.market_cap.toLocaleString()}` },
                  { text: `24h Change: ${item.price_change_percentage_24h.toFixed(2)}%` },
                  { text: "1 day data retention", checked: false },
                ]}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No API-based crypto data available.</p>
      )}
  </div>
     
<div className='flex flex-col w-full items-center gap-5 justify-center'>  
  <h1 className='font-semibold text-3xl'>Latest News</h1>  
   <div className='flex gap-3 h-130 items-center justify-center'>
   {news && news.length > 0 ? (
        <AnimatedList  >
          {news.slice(0, 5).map((item, idx) => (
            <Notification
              {...item}
              key={idx}
              time= {new Date(item.pubDate).toLocaleString()}
              // description={item.description.split(" ").slice(0, 20).join(" ") + (item.description.split(" ").length > 30 ? "..." : "")}
            />
          ))}
        </AnimatedList>
      ) : (
        <p>No news data available.</p>
      )}
   </div>  
  </div>
 
    </div>
  );
}