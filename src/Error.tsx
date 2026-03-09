import type { ReactNode } from 'react';

interface ErrorProps {
  children?: ReactNode;
}

export function Error({ children }: ErrorProps) {
  return (
    <div
      style={{
        backgroundColor: 'rgba(243, 244, 246, 0.5)',
        padding: '8px',
        borderRadius: '4px',
        color: 'black',
      }}
    >
      {children}
    </div>
  );
}
