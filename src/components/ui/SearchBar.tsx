import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onSearch, placeholder = 'Search teams or leagues' }: SearchBarProps) => {
  const [query, setQuery] = useState(value);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <label className="flex items-center gap-3 rounded-2xl border border-stake-border bg-stake-input px-4 py-3">
      <Search className="h-4 w-4 text-stake-textMuted" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-stake-textPrimary outline-none placeholder:text-stake-textMuted"
      />
    </label>
  );
};
