import React from 'react'

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Orbital icon/mark */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Outer orbit ring */}
        <div className="absolute w-10 h-10 rounded-full border-2 border-blue-500/80"></div>
        {/* Middle orbit ring */}
        <div className="absolute w-6 h-6 rounded-full border border-blue-400/60"></div>
        {/* Center dot */}
        <div className="absolute w-2 h-2 rounded-full bg-blue-500"></div>
        {/* Rotating accent element */}
        <div className="absolute w-10 h-10 rounded-full animate-spin opacity-40 bg-linear-to-r from-blue-500 to-cyan-400 blur-sm" style={{ animationDuration: '4s' }}></div>
      </div>
      
      {/* Text container */}
      <div className="flex flex-col gap-0">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Orbit
          </span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Ops
          </span>
        </div>
        <div className="h-1 w-12 bg-linear-to-r from-blue-500 to-cyan-400 rounded-full"></div>
      </div>
    </div>
  )
}
