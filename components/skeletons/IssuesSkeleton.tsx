import React from 'react'

export const IssuesSkeleton = () => {
  return (
    <div className="animate-pulse rounded-md border p-6">
      <div className="h-5 w-48 bg-slate-200 rounded mb-4" />
      <div className="space-y-3">
        {Array.from({length:5}).map((_,i)=>(
          <div key={i} className="p-4 border rounded-md">
            <div className="h-4 w-56 bg-slate-200 rounded mb-2" />
            <div className="h-3 w-full bg-slate-200 rounded mb-2" />
            <div className="flex gap-2">
              <div className="h-4 w-16 bg-slate-200 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
              <div className="h-4 w-24 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IssuesSkeleton