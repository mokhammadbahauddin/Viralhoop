import React from 'react';
import { cn } from '../../cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border border-zinc-200 shadow-sm rounded-lg overflow-hidden',
          className
        )}
        {...props}
      />
    );
  }
);
