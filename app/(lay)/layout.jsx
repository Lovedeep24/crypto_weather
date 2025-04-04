"use client"
import React from 'react'
import { FloatingNav } from "@/components/ui/floating-navbar"
import {
  Home,
  LayoutDashboard,
  CloudSun,
  CandlestickChart,
} from "lucide-react";


export default function layout({ children }) {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Weather",
      link: "/weather",
      icon: <CloudSun className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Crypto",
      link: "/crypto",
      icon: <CandlestickChart className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className=""> 
        <FloatingNav className={"border-2 border-blue-900"} navItems={navItems} />
  
        <main>
            {children}
        </main>
      
    </div>
  )
}
