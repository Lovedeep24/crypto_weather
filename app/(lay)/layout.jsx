"use client"
import React from 'react'
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Home, MessageSquare, User } from "lucide-react"
import { Provider } from 'react-redux';
import { store } from '../../store/store';

export default function layout({ children }) {
    const navItems = [
        {
          name: "Home",
          link: "/",
          icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
          name: "Weather",
          link: "/about",
          icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Crypto",
            link: "/about",
            icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
          },
        {
          name: "News",
          link: "/contact",
          icon: <MessageSquare className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
      ]
    
  return (
    <div className="h-screen border-2 border-red-800"> 
        <FloatingNav navItems={navItems} />
        <Provider store={store}>
        <main className="pt-20 fixed p-4 border-2 h-full w-full overflow-y-auto flex flex-col items-center justify-center">
            {children}
        </main>
        </Provider>
    </div>
  )
}
