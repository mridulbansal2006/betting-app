import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

const toneClasses: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-stake-hover text-stake-textSecondary border-stake-border',
  success: 'bg-stake-green/15 text-stake-green border-stake-green/20',
  warning: 'bg-stake-yellow/15 text-stake-yellow border-stake-yellow/20',
  danger: 'bg-stake-red/15 text-stake-red border-stake-red/20',
  info: 'bg-stake-blue/15 text-stake-blue border-stake-blue/20',
};

export const Badge = ({ className, tone = 'neutral', ...props }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold',
      toneClasses[tone],
      className,
    )}
    {...props}
  />
);
