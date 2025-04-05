"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/store/slices/dataSlice";
import { Star } from "lucide-react";

export default function Weather() {
  const [weatherData, setWeatherData] = useState([]);
  const [favorites, setFavorites] = useState({});
  const dispatch = useDispatch();
  const { weather } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (weather?.list) {
      const extractedData = weather.list.map((item) => ({
        city: item.name,
        temp: item.main.temp,
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        feels_like: item.main.feels_like,
        time: item.dt,
        weather: item.weather[0].main,
        humidity: item.main.humidity,
      }));
      setWeatherData(extractedData);
    }
  }, [weather]);

  const isLoading = weatherData.length === 0;

  const toggleFavorite = (index) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-background mt-15 flex h-full w-full flex-col items-center px-15 justify-center">
      <p className="mt-4 text-center text-3xl text-muted-foreground">Weather Details</p>
      <Table className="mt-10 w-full">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead></TableHead>
            <TableHead>City</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Weather</TableHead>
            <TableHead>Temperature</TableHead>
            <TableHead>Min. Temp</TableHead>
            <TableHead>Max. Temp</TableHead>
            <TableHead>Feels Like</TableHead>
            <TableHead>Humidity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 10 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : weatherData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell onClick={() => toggleFavorite(index)} className="cursor-pointer">
                    <Star
                      size={18}
                      className={favorites[index] ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.city}</TableCell>
                  <TableCell>{new Date(item.time * 1000).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(item.time * 1000).toLocaleTimeString()}</TableCell>
                  <TableCell>{item.weather}</TableCell>
                  <TableCell>{item.temp}</TableCell>
                  <TableCell>{item.minTemp}</TableCell>
                  <TableCell>{item.maxTemp}</TableCell>
                  <TableCell>{item.feels_like}</TableCell>
                  <TableCell>{item.humidity}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
