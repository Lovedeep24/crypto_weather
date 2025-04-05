"use client";
const Weather = dynamic(() => import("@/pages/Weather"), { ssr: false });
import React from 'react'

export default function page() {
  return (
    <div>
      <Weather/>
    </div>
  )
}
