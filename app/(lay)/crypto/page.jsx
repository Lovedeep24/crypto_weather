"use client";
import React from 'react'
import dynamic from 'next/dynamic';
const Crypto = dynamic(() => import("@/app/Components/Crypto"), { ssr: false });
export default function page() {
  return (
    <div>
    <Crypto/>
    </div>
  )
}
