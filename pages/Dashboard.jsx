"use client"
import React, { useEffect, useState } from 'react';
import { PricingCard } from "@/components/ui/dark-gradient-pricing";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '@/store/slices/dataSlice';
import { WeatherWidget } from '@/components/ui/weather-widget';
import { AnimatedList } from "@/components/ui/animated-list";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState([]);
  const dispatch = useDispatch();
  const { weather, crypto, news, loading, webCrypto } = useSelector((state) => state.data);

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

  const Notification = ({ name, description, icon, color, time }) => (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[70%] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white dark:bg-transparent dark:backdrop-blur-md dark:border dark:border-white/10 dark:shadow-[inset_0_-20px_80px_-20px_#ffffff1f]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-13 items-center justify-center rounded-2xl" style={{ backgroundColor: "#FF3D71" }}>
          <span className="text-2xl"> 💬</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="ml-2 text-sm text-gray-500">{time}</span>
          </figcaption>
          <p className="text-md font-normal text-gray-700">{description}</p>
        </div>
      </div>
    </figure>
  );

  const getPrice = (item) => {
    if (webCrypto && webCrypto[item.name.toLowerCase()]) {
      return parseFloat(webCrypto[item.name.toLowerCase()]).toFixed(2);
    }
    return item.current_price.toFixed(2);
  };

  return (
    <div className='mt-20 flex flex-col gap-15'>
      
      
      <div className='flex flex-col w-full gap-7 items-center justify-center'>
        <h1 className='font-semibold text-3xl'>Weather Information</h1>
        <div className='flex gap-3 items-center justify-center flex-wrap'>
          {loading || weatherData.length === 0 ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-[16rem] h-[10rem] rounded-xl" />
            ))
          ) : (
            weatherData.map((data, index) => (
              <div key={index} className="p-2 mb-2">
                <WeatherWidget width="16rem" className="shadow-md" data={data} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className='flex flex-col w-full gap-7 items-center justify-center'>
        <h1 className='font-semibold text-3xl'>Live Crypto Tracker</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 w-full max-w-7xl px-4">
          {loading || !crypto?.length ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[16rem] w-full rounded-xl" />
            ))
          ) : (
            crypto.map((item, index) => (
              <PricingCard
                key={index}
                cryptoName={item.name}
                price={getPrice(item)}
                benefits={[
                  { text: `Market Cap: ${item.market_cap.toLocaleString()}` },
                  { text: `24h Change: ${item.price_change_percentage_24h.toFixed(2)}%` },
                ]}
              />
            ))
          )}
        </div>
      </div>

    
      <div className='flex flex-col w-full items-center gap-5 justify-center'>
        <h1 className='font-semibold text-3xl'>Latest News</h1>
        <div className='flex gap-3 flex-col w-full max-w-4xl'>
          {loading || !news?.length ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[100px] w-full rounded-xl" />
            ))
          ) : (
            <AnimatedList>
              {news.slice(0, 5).map((item, idx) => (
                <Notification
                  key={idx}
                  {...item}
                  time={new Date(item.pubDate).toLocaleString()}
                  description={item.description.split(" ").slice(0, 20).join(" ") + (item.description.split(" ").length > 30 ? "..." : "")}
            
                />
              ))}
            </AnimatedList>
          )}
        </div>
      </div>
    </div>
  );
}
