import React from "react"
import { Search, X } from "lucide-react"
import {
    FiltersArea,
    SearchInput,
    Select,
    ActionButton
} from "../OrdersTab.styles"

export default function OrdersFilters({
    query,
    onQueryChange,
    searchRange,
    onSearchRangeChange,
    onClear,
    rangeOptions
}) {
    return (
        <FiltersArea>
            <SearchInput
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search by Phone, Customer or Order..."
            />
            <Select value={searchRange} onChange={(event) => onSearchRangeChange(event.target.value)}>
                {rangeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </Select>
            <ActionButton $primary aria-label="Search">
                <Search size={18} />
            </ActionButton>
            <ActionButton aria-label="Clear filters" onClick={onClear}>
                <X size={18} />
            </ActionButton>
        </FiltersArea>
    )
}
