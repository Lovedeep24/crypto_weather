"use client"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '@/store/slices/dataSlice';
export default function Dashboard() {
  const dispatch = useDispatch();
  const { weather, crypto, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Weather</h3>
      {weather && <div>{JSON.stringify(weather)}</div>}
      
      <h3>Crypto</h3>
      {crypto && <div>{JSON.stringify(crypto)}</div>}
   
    </div>
  );
}
