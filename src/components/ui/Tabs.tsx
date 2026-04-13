import { cn } from '../../lib/utils';

interface TabItem<T extends string> {
  value: T;
  label: string;
}

interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
}

export const Tabs = <T extends string>({ tabs, value, onChange }: TabsProps<T>) => (
  <div className="inline-flex rounded-2xl border border-stake-border bg-stake-input p-1">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange(tab.value)}
        className={cn(
          'rounded-xl px-4 py-2 text-sm font-medium transition',
          value === tab.value
            ? 'bg-stake-green text-black'
            : 'text-stake-textSecondary hover:text-stake-textPrimary',
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
