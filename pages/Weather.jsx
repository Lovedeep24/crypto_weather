"use client"
import React from 'react'
import { useEffect,useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '@/store/slices/dataSlice';
export default function Weather() {
   const[weatherData,setWeatherData]=useState([]);
      const dispatch = useDispatch();
      const { weather } = useSelector((state) => state.data);
      useEffect(() => {
        dispatch(fetchData());
      }, [dispatch]);
    
      useEffect(() => {
        if (weather?.list) {
          const extractedData = weather.list.map(item => ({
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
    
  return (
    <div className="bg-background mt-30 flex h-full w-full flex-col items-center px-15 justify-center ">
    <p className="mt-4 text-center text-3xl text-muted-foreground">Weather Details</p>
      <Table className="mt-10">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
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
          {weatherData.map((item) => (
            <TableRow key={item.id}>
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
  )
}
