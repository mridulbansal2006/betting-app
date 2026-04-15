import { cn } from '../../lib/utils';

interface IconProps {
  name: string;
  className?: string;
  fill?: boolean;
  weight?: number;
  grade?: number;
  opticalSize?: number;
}

export const Icon = ({
  name,
  className,
  fill = false,
  weight = 400,
  grade = 0,
  opticalSize = 24,
}: IconProps) => {
  return (
    <span
      className={cn('material-symbols-outlined select-none', className)}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
      }}
    >
      {name}
    </span>
  );
};
