import React from "react"
import { SubNav, SubNavItem } from "../SectionsManager/SectionsManager.styles"

export default function SectionsNav({ sections, sectionData, activeSectionId, onSelect }) {
    return (
        <SubNav>
            {sections.map(s => {
                const data = sectionData[s.id] || {}
                const label = data.linkName || data.title || s.name
                return (
                    <SubNavItem
                        key={s.id}
                        $active={activeSectionId === s.id}
                        onClick={() => onSelect(s.id)}
                    >
                        {s.icon} {label}
                    </SubNavItem>
                )
            })}
        </SubNav>
    )
}
