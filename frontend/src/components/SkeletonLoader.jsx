import React from "react";

export function CourseCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      </div>
      <div className="h-7 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
      <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl pt-2"></div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      <div className="h-10 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="h-32 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        </div>
        <div className="h-96 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      </div>
    </div>
  );
}
