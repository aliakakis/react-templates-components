import type { PropsWithChildren } from 'react';

export interface RtSharedProps extends PropsWithChildren {
  tag?: string;
  className?: string;
  useFragment?: boolean;
}
