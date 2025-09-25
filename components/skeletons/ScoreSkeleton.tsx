import React from 'react'

export const ScoreSkeleton = () => {
  return (
    <div className="animate-pulse rounded-md border p-6">
      <div className="h-5 w-64 bg-slate-200 rounded mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="text-center space-y-2">
          <div className="h-14 w-14 rounded-full bg-slate-200 mx-auto" />
          <div className="h-3 w-24 bg-slate-200 mx-auto rounded" />
          <div className="h-2 w-28 bg-slate-200 mx-auto rounded" />
        </div>
        {Array.from({length:4}).map((_,i)=>(
          <div key={i} className="text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-slate-200 mx-auto" />
            <div className="h-3 w-20 bg-slate-200 mx-auto rounded" />
            <div className="h-2 w-24 bg-slate-200 mx-auto rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScoreSkeleton