import React from "react"
import {
    SelectionToolbar,
    SelectionSummary,
    SelectionTitle,
    SelectionMeta,
    SelectionActions,
    GhostButton,
    PrimaryButton
} from "../OrdersTab.styles"

export default function OrdersSelectionBar({ selectedCount, onClear, onOpenStatusModal }) {
    if (!selectedCount) return null

    return (
        <SelectionToolbar>
            <SelectionSummary>
                <SelectionTitle>{selectedCount} order{selectedCount === 1 ? "" : "s"} selected</SelectionTitle>
                <SelectionMeta>Choose a professional next-step status for the selected orders in the current view.</SelectionMeta>
            </SelectionSummary>

            <SelectionActions>
                <GhostButton onClick={onClear}>Clear selection</GhostButton>
                <PrimaryButton onClick={onOpenStatusModal}>
                    Change status
                </PrimaryButton>
            </SelectionActions>
        </SelectionToolbar>
    )
}
