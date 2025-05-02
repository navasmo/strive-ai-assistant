'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PlayIcon, PauseIcon, RefreshCwIcon } from 'lucide-react'

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [breathState, setBreathState] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [seconds, setSeconds] = useState(0)
  const [breathCycle, setBreathCycle] = useState(0)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Animation timing in seconds
  const inhaleDuration = 4
  const holdDuration = 4
  const exhaleDuration = 6
  const totalCycleDuration = inhaleDuration + holdDuration + exhaleDuration
  
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1
          const cyclePosition = newSeconds % totalCycleDuration
          
          // Determine breath state based on position in cycle
          if (cyclePosition < inhaleDuration) {
            setBreathState('inhale')
          } else if (cyclePosition < inhaleDuration + holdDuration) {
            setBreathState('hold')
          } else {
            setBreathState('exhale')
          }
          
          // Update breath cycle counter at end of cycle
          if (newSeconds > 0 && newSeconds % totalCycleDuration === 0) {
            setBreathCycle(prev => prev + 1)
          }
          
          return newSeconds
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive])
  
  const toggleExercise = () => {
    setIsActive(prev => !prev)
  }
  
  const resetExercise = () => {
    setIsActive(false)
    setSeconds(0)
    setBreathCycle(0)
    setBreathState('inhale')
  }
  
  const calculateProgress = () => {
    const cyclePosition = seconds % totalCycleDuration
    
    switch (breathState) {
      case 'inhale':
        return (cyclePosition / inhaleDuration) * 100
      case 'hold':
        return 100
      case 'exhale':
        return 100 - (((cyclePosition - inhaleDuration - holdDuration) / exhaleDuration) * 100)
      default:
        return 0
    }
  }
  
  const getInstructionText = () => {
    switch (breathState) {
      case 'inhale':
        return 'Breathe In'
      case 'hold':
        return 'Hold'
      case 'exhale':
        return 'Breathe Out'
      default:
        return 'Get Ready'
    }
  }
  
  // Circle animation styles
  const progress = calculateProgress()
  const circleSize = isActive ? Math.max(120, 120 + (breathState === 'inhale' ? progress / 2 : 0)) : 120
  const opacity = isActive ? 0.7 + ((breathState === 'inhale' ? progress : 100 - progress) / 333) : 0.7
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-md mx-auto text-center">
      <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-gray-100">
        4-4-6 Breathing Exercise
      </h3>
      
      <div className="flex flex-col items-center my-6">
        <div
          className={cn(
            "breathing-circle flex items-center justify-center mb-6",
            breathState === 'inhale' ? 'bg-blue-100 dark:bg-blue-900/40' : 
            breathState === 'hold' ? 'bg-purple-100 dark:bg-purple-900/40' :
            'bg-green-100 dark:bg-green-900/40'
          )}
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            opacity: opacity,
          }}
        >
          <span 
            className={cn(
              "font-medium text-lg",
              breathState === 'inhale' ? 'text-blue-700 dark:text-blue-300' : 
              breathState === 'hold' ? 'text-purple-700 dark:text-purple-300' :
              'text-green-700 dark:text-green-300'
            )}
          >
            {getInstructionText()}
          </span>
        </div>
        
        {breathCycle > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Completed cycles: {breathCycle}
          </div>
        )}
      </div>
      
      <div className="flex justify-center gap-4">
        <Button
          onClick={toggleExercise}
          className={cn(
            "flex items-center",
            isActive ? 
              "bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700" : 
              "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
          )}
        >
          {isActive ? (
            <>
              <PauseIcon className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4 mr-2" />
              {seconds > 0 ? 'Resume' : 'Start'}
            </>
          )}
        </Button>
        
        {(seconds > 0 || breathCycle > 0) && (
          <Button
            onClick={resetExercise}
            variant="outline"
            className="flex items-center border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </div>
      
      <div className="mt-4 text-sm text-blue-700 dark:text-blue-300 max-w-sm text-center mx-auto">
        This breathing technique can help reduce anxiety and promote relaxation. Try to focus on your breathing as you follow along.
      </div>
    </div>
  )
}
