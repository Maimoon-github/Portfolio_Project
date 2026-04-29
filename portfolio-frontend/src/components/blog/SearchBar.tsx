"use client"

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Search posts..." }: SearchBarProps) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input w-full pl-12 py-6 text-lg placeholder:text-on-surface-variant"
      />
    </div>
  );
}