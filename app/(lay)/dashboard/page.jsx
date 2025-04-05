"use client";
// import Dashboard from '@/pages/Dashboard'
import React from 'react'
import dynamic from 'next/dynamic';
const Dashboard = dynamic(() => import("@/app/Components/Dashboard"), { ssr: false });
export default function page() {
  return (
    <div>
      <Dashboard/>
    </div>
  )
}
