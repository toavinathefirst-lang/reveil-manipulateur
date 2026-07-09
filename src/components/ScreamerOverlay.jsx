import React from 'react';
import { Eye } from 'lucide-react';

export default function ScreamerOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ animation: 'screamer-flash 0.35s steps(2) infinite' }}
    >
      <div
        className="flex flex-col items-center gap-4"
        style={{ animation: 'screamer-shake 0.15s linear infinite' }}
      >
        <Eye className="w-32 h-32 sm:w-40 sm:h-40 text-red-600" strokeWidth={1.5} />
        <p className="text-3xl sm:text-4xl font-black text-red-600 tracking-widest uppercase text-center px-6">
          Je te vois
        </p>
      </div>
    </div>
  );
}