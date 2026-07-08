import React from 'react';

export default function ClockDisplay({ currentTime }) {
  return (
    <div className="text-center my-6">
      <div className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-50 to-slate-300 tabular-nums">
        {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
    </div>
  );
}