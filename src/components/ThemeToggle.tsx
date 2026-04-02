import React from 'react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export default function ThemeToggle({ isDark, onToggle, className = "" }: ThemeToggleProps) {
  return (
    <div className={`toggle-wrapper ${className} ${!isDark ? 'light-mode-nav' : ''}`}>
      <input 
        className="toggle-checkbox" 
        type="checkbox" 
        checked={!isDark} 
        onChange={onToggle}
        title="Toggle Theme"
        aria-label="Toggle dark mode"
      />
      <div className="toggle-container">
        {/* Track icons for premium background depth */}
        <div className="absolute left-[0.3em] flex items-center justify-center text-[#444] pointer-events-none">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
        </div>
        <div className="absolute right-[0.3em] flex items-center justify-center text-[#bbb] pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="4.22" x2="19.78" y2="5.64" /></svg>
        </div>

        <div className="toggle-button">
          {/* Moon Icon (Dark Mode Active) */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
             <svg width="12" height="12" className="text-[#eee]" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          </div>
          {/* Sun Icon (Light Mode Active) */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${!isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
             <svg width="14" height="14" className="text-[#333]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="4.22" x2="19.78" y2="5.64" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
