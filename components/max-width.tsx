import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function MaxWidth({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-content px-6 sm:px-8 lg:px-12',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
