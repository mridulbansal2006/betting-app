import { Tabs } from '../ui/Tabs';
import type { BetStatus } from '../../types';

type FilterValue = 'all' | BetStatus;

export const BetFilters = ({
  value,
  onChange,
}: {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}) => (
  <Tabs
    tabs={[
      { value: 'all', label: 'All' },
      { value: 'pending', label: 'Active' },
      { value: 'won', label: 'Won' },
      { value: 'lost', label: 'Lost' },
    ]}
    value={value}
    onChange={onChange}
  />
);
