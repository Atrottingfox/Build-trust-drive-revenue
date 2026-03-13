import React from 'react';

export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img 
      src="/logo.svg"
      alt="The Authority Engine"
      className={className}
    />
  );
}