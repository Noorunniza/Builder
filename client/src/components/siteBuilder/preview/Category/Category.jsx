import React from "react"
import { CategoryRow, CategoryPill, CategoryCircle, CategoryImage, CategoryName, DEFAULT_PRIMARY_COLOR } from "./Category.styles"

export default function Category({ categories = [], primaryColor, selectedCategory, onSelectCategory }) {
    const primary = primaryColor || DEFAULT_PRIMARY_COLOR

    // Only render categories explicitly provided
    const displayCategories = categories

    return (
        <CategoryRow>
            {/* Always add 'All' as the first option */}
            <CategoryPill 
                onClick={() => onSelectCategory(null)}
                $opacity={!selectedCategory ? 1 : 0.5}
            >
                <CategoryCircle $primaryColor={primary} $all>
                    ALL
                </CategoryCircle>
                <CategoryName>All</CategoryName>
            </CategoryPill>

            {displayCategories.map((cat, idx) => {
                const name = typeof cat === 'string' ? cat : cat.name
                const image = typeof cat === 'object' ? cat.image : null
                const emoji = typeof cat === 'object' ? cat.emoji : null

                const isSelected = selectedCategory && (selectedCategory._id === cat._id || selectedCategory.name === name)
                
                return (
                    <CategoryPill 
                        key={name + idx} 
                        onClick={() => onSelectCategory(cat)}
                        $opacity={selectedCategory ? (isSelected ? 1 : 0.5) : 1}
                    >
                        <CategoryCircle $primaryColor={primary} $hasImage={!!image}>
                            {image ? (
                                <CategoryImage src={image} alt={name} />
                            ) : (
                                emoji || name.charAt(0).toUpperCase()
                            )}
                        </CategoryCircle>
                        <CategoryName>{name}</CategoryName>
                    </CategoryPill>
                )
            })}
        </CategoryRow>
    )
}
