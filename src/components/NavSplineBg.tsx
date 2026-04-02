"use client";

import Spline from '@splinetool/react-spline';

export default function NavSplineBg() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      {/* 
        Awaiting literal .splinecode URL from user.
        An incorrect URL causes the "Data read, but end of buffer not reached" error.
      */}
      <div className="w-full h-full bg-transparent" />
    </div>
  );
}
