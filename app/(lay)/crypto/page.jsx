"use client";
import React from 'react'
const Crypto = dynamic(() => import("@/pages/Crypto"), { ssr: false });
export default function page() {
  return (
    <div>
    <Crypto/>
    </div>
  )
}
