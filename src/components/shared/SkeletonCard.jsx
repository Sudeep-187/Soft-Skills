import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[var(--border-warm)]/50">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 skeleton" />
        <div className="h-4 w-full skeleton" />
        <div className="h-3 w-24 skeleton" />
        <div className="flex justify-between">
          <div className="h-5 w-16 skeleton" />
          <div className="h-4 w-10 skeleton" />
        </div>
      </div>
    </div>
  );
}