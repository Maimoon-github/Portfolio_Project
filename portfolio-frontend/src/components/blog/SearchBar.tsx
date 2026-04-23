// src/components/blog/SearchBar.tsx
"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/useDebounce"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = "Search posts..." }: SearchBarProps) {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value, 300)

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-11 bg-secondary"
      />
    </div>
  )
}