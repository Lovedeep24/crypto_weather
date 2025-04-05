"use client";
import React from 'react'
import { Boxes } from "@/components/ui/background-boxes"
import { cn } from "@/lib/utils";
import RotatingText from '@/components/ui/rotatingText';
import { ButtonColorful } from "@/components/ui/button-colorful"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter()
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute  h-full  bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className='flex items-center justify-center gap-3 relative z-10'>
        <p className=' text-2xl md:text-5xl text-white font-semibold text-nowrap'>Get Latest Information on </p>
        <RotatingText
          texts={['Weather', 'Crypto', 'Bitcoin', 'Stocks', 'NFTs', 'Latest News']}
          mainClassName="px-2  sm:px-2 text-2xl font-semibold md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 md:mt-2 mt-0 justify-center rounded-lg"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
        </div>
        <h1 className={cn("text-xl md:text-3xl text-white mt-5 relative z-20 text-center px-4 max-w-2xl mx-auto")}>
  Your one stop solution for all your tracking needs and daily updates
</h1>
     <ButtonColorful onClick={() => router.push('/dashboard')}className={"mt-10"} />
    </div>
  );

}
