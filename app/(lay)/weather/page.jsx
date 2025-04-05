"use client";
import dynamic from 'next/dynamic';
const Weather = dynamic(() => import("@/app/Components/Weather"), { ssr: false });
import React from 'react'

export default function page() {
  return (
    <div>
      <Weather/>
    </div>
  )
}
