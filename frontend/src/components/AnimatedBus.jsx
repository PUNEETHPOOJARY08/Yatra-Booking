import React from 'react';


export default function AnimatedBus() {
  return (
    <div className="absolute left-0 bottom-6 w-full pointer-events-none select-none z-0">
      <div className="relative w-full h-16 overflow-visible">
        <svg
          className="absolute animate-bus-move"
          style={{ left: 0, bottom: 0, width: 120, height: 48 }}
          viewBox="0 0 120 48"
          fill="none"
        >
          {/* Simple bus shape */}
          <rect x="10" y="20" width="100" height="20" rx="6" fill="#4F46E5" />
          <rect x="20" y="10" width="80" height="20" rx="6" fill="#6366F1" />
          <circle cx="30" cy="42" r="6" fill="#22223b" />
          <circle cx="90" cy="42" r="6" fill="#22223b" />
          <rect x="28" y="15" width="16" height="10" rx="2" fill="#fff" />
          <rect x="48" y="15" width="16" height="10" rx="2" fill="#fff" />
          <rect x="68" y="15" width="16" height="10" rx="2" fill="#fff" />
        </svg>
      </div>
      <style>
        {`
          @keyframes bus-move {
            0% { transform: translateX(-130px); }
            100% { transform: translateX(100vw); }
          }
          .animate-bus-move {
            animation: bus-move 5s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

<AnimatedBus />