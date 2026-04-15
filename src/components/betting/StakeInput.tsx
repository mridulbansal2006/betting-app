import { Icon } from '../ui/Icon';

interface StakeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const StakeInput = ({ value, onChange }: StakeInputProps) => (
  <label className="flex items-center gap-3 rounded-2xl border border-stake-border bg-stake-input px-3 py-2">
    <Icon name="database" className="h-5 w-5 text-stake-textMuted" fill={true} />
    <input
      type="number"
      min={10}
      max={5000}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="w-full bg-transparent font-mono text-sm text-stake-textPrimary outline-none"
    />
  </label>
);
