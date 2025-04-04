"use client";
import * as React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudRain, Snowflake, Loader2, MapPin, RefreshCw, Sun, Moon, CloudLightning, CloudFog as CloudMist, Thermometer } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Maps weather condition strings to standardized weather types
 * @param condition - The weather condition string from API
 * @returns Standardized weather type
 */
const mapWeatherType = condition => {
  const main = condition.toLowerCase()
  if (main.includes('clear')) return 'clear'
  if (main.includes('cloud')) return 'clouds'
  if (main.includes('rain') || main.includes('drizzle')) return 'rain'
  if (main.includes('snow')) return 'snow'
  if (main.includes('thunder')) return 'thunderstorm'
  if (main.includes('mist') || main.includes('fog') || main.includes('haze')) return 'mist'
  return 'unknown'
}

// Animation variants for different weather types
const weatherAnimations = {
  // Container animation with staggered children
  container: {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  // Standard animation for most elements
  item: {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15
      }
    }
  },
  // Continuous rotation animation
  rotate: {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 20,
        ease: "linear"
      }
    }
  },
  // Subtle pulsing effect for sun/moon
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  },
  // Rain droplet animation
  rain: {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: [0, 1, 0],
      y: [0, 20],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      }
    }
  },
  // Snowflake animation with horizontal drift
  snow: (i) => ({
    initial: { opacity: 0, y: -5 },
    animate: {
      opacity: [0, 1, 0],
      y: [0, 15],
      x: [0, (i % 2 === 0 ? 5 : -5), 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
        delay: i * 0.2
      }
    }
  }),
  // Lightning flash animation
  lightning: {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0.5, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.21, 0.3],
        repeatDelay: 1.5
      }
    }
  },
  // Mist/fog drifting animation
  mist: {
    initial: { opacity: 0.3, x: -20 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      x: [-20, 20, -20],
      transition: {
        repeat: Infinity,
        duration: 8,
        ease: "easeInOut"
      }
    }
  }
}

// Animation components for each weather type
const AnimatedWeatherIcons = {
    clear: ({
      isDay
    }) => (
      <motion.div variants={weatherAnimations.item} className="relative">
        {isDay ? (
          <motion.div
            animate={weatherAnimations.rotate.animate}
            className="text-primary"
            aria-label="Clear day">
            <Sun className="h-8 w-8 text-amber-400 dark:text-amber-300" />
            <motion.div className="absolute inset-0" animate={weatherAnimations.pulse.animate}>
              <Sun className="h-8 w-8 text-amber-400 dark:text-amber-300" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            animate={weatherAnimations.pulse.animate}
            className="text-primary-foreground"
            aria-label="Clear night">
            <Moon className="h-8 w-8 text-slate-300 dark:text-slate-200" />
          </motion.div>
        )}
      </motion.div>
    ),
    
    clouds: () => (
      <motion.div
        variants={weatherAnimations.item}
        className="relative"
        aria-label="Cloudy weather">
        <Cloud className="h-8 w-8 text-slate-500 dark:text-slate-300" />
        <motion.div
          className="absolute -left-3 top-1"
          animate={{
            x: [0, 3, 0],
            transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}>
          <Cloud className="h-6 w-6 text-slate-400/70 dark:text-slate-400/80" />
        </motion.div>
      </motion.div>
    ),
    
    rain: () => (
      <motion.div
        variants={weatherAnimations.item}
        className="relative"
        aria-label="Rainy weather">
        <CloudRain className="h-8 w-8 text-blue-400 dark:text-blue-300" />
        <div className="absolute bottom-0 left-1 right-1 h-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 bg-blue-400 dark:bg-blue-300 w-[2px] h-[7px] rounded-full opacity-0"
              style={{ left: `${25 + i * 20}%` }}
              variants={weatherAnimations.rain}
              animate="animate"
              initial="initial"
              custom={i} />
          ))}
        </div>
      </motion.div>
    ),
    
    snow: () => (
      <motion.div
        variants={weatherAnimations.item}
        className="relative"
        aria-label="Snowy weather">
        <Snowflake className="h-8 w-8 text-blue-300 dark:text-blue-200" />
        <div className="absolute bottom-0 left-0 right-0 h-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 bg-blue-300 dark:bg-blue-200 w-[3px] h-[3px] rounded-full opacity-0"
              style={{ left: `${25 + i * 20}%` }}
              variants={weatherAnimations.snow(i)}
              animate="animate"
              initial="initial"
              custom={i} />
          ))}
        </div>
      </motion.div>
    ),
    
    thunderstorm: () => (
      <motion.div
        variants={weatherAnimations.item}
        className="relative"
        aria-label="Thunderstorm weather">
        <CloudLightning className="h-8 w-8 text-amber-400 dark:text-amber-300" />
        <motion.div
          className="absolute inset-0"
          variants={weatherAnimations.lightning}
          animate="animate"
          initial="initial">
          <CloudLightning className="h-8 w-8 text-amber-300 dark:text-amber-200" />
        </motion.div>
      </motion.div>
    ),
    
    mist: () => (
      <motion.div
        variants={weatherAnimations.item}
        className="relative"
        aria-label="Misty weather">
        <CloudMist className="h-8 w-8 text-slate-400 dark:text-slate-300" />
        <motion.div
          className="absolute inset-0 opacity-30"
          variants={weatherAnimations.mist}
          animate="animate"
          initial="initial">
          <CloudMist className="h-8 w-8 text-slate-400 dark:text-slate-300" />
        </motion.div>
      </motion.div>
    ),
    
    unknown: () => (
      <motion.div variants={weatherAnimations.item} aria-label="Unknown weather condition">
        <Thermometer className="h-8 w-8 text-slate-500 dark:text-slate-300" />
      </motion.div>
    )
  }

/**
 * Get the appropriate weather icon based on type, time of day, and animation preference
 * @param type - Weather type
 * @param isDay - Whether it's daytime
 * @param animated - Whether animations are enabled
 * @returns React component for the weather icon
 */
const getWeatherIcon = (type, isDay, animated) => {
  if (animated) {
    const IconComponent = AnimatedWeatherIcons[type]
    return <IconComponent isDay={isDay} />;
  }
  
  // Fallback to static icons if animations are disabled
  switch (type) {
    case 'clear':
      return isDay 
        ? <Sun
        className="h-8 w-8 text-amber-400 dark:text-amber-300"
        aria-label="Clear day" /> 
        : <Moon
        className="h-8 w-8 text-slate-300 dark:text-slate-200"
        aria-label="Clear night" />;
    case 'clouds':
      return (
        <Cloud
          className="h-8 w-8 text-slate-500 dark:text-slate-300"
          aria-label="Cloudy weather" />
      );
    case 'rain':
      return (
        <CloudRain
          className="h-8 w-8 text-blue-400 dark:text-blue-300"
          aria-label="Rainy weather" />
      );
    case 'snow':
      return (
        <Snowflake
          className="h-8 w-8 text-blue-300 dark:text-blue-200"
          aria-label="Snowy weather" />
      );
    case 'thunderstorm':
      return (
        <CloudLightning
          className="h-8 w-8 text-amber-400 dark:text-amber-300"
          aria-label="Thunderstorm weather" />
      );
    case 'mist':
      return (
        <CloudMist
          className="h-8 w-8 text-slate-400 dark:text-slate-300"
          aria-label="Misty weather" />
      );
    default:
      return (
        <Thermometer
          className="h-8 w-8 text-slate-500 dark:text-slate-300"
          aria-label="Unknown weather condition" />
      );
  }
}
export function WeatherWidget({
  width = "16rem",
  className = "",
  animated = true
}) {
  const [weather, setWeather] = useState({
    city: "New York",
    temperature: 25,
    dateTime: new Date().toLocaleString(),
    weatherType: "Clouds",
    isDay: true,
  })

  return (
    (<Card
      className={`overflow-hidden rounded-xl border-none shadow-lg bg-gradient-to-br from-background/90 to-muted/90 backdrop-blur ${className}`}
      style={{ width }}
      role="region"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Weather information">
      {/* Hidden element for screen reader announcements */}
      <div
        id="weather-update-announcement"
        className="sr-only"
        aria-live="assertive"></div>
      <CardContent className="p-4 text-foreground">
        <AnimatePresence mode="wait">
          
            <motion.div
              key="weather"
              variants={animated ? weatherAnimations.container : undefined}
              initial={animated ? "hidden" : undefined}
              animate={animated ? "show" : undefined}
              exit={{ opacity: 0 }}
              aria-label={`Current weather in ${weather.city}`}>
              <div className="flex justify-between items-center mb-2">
                <div className="text-3xl">
                  {getWeatherIcon(weather.weatherType, weather.isDay, animated)}
                </div>
              </div>
              <div className="space-y-1">
                <motion.div
                  variants={weatherAnimations.item}
                  className="text-4xl font-extralight"
                  initial={animated ? { scale: 0.9, opacity: 0 } : undefined}
                  animate={animated ? { scale: 1, opacity: 1 } : undefined}
                  transition={{ type: "spring", damping: 10 }}
                  aria-label={`Temperature: ${weather.temperature} degrees celsius`}>
                  {weather.temperature}<span className="text-2xl">°</span>
                </motion.div>
                <motion.div
                  variants={weatherAnimations.item}
                  className="flex items-center text-xs text-muted-foreground">
                  <MapPin size={12} className="mr-1" aria-hidden="true" />
                  <span>{weather.city}</span>
                </motion.div>
                <motion.div
                  variants={weatherAnimations.item}
                  className="text-xs text-muted-foreground">
                  {weather.dateTime}
                </motion.div>
              </div>
            </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>)
  );
}