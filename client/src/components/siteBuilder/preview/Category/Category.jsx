import React from "react"
import { CategoryRow, CategoryPill, CategoryCircle, CategoryImage, CategoryName } from "./Category.styles"

export default function Category({ categories = [], primaryColor, selectedCategory, onSelectCategory }) {
    const primary = primaryColor || "#0f172a"

    // Only render categories explicitly provided
    const displayCategories = categories

    return (
        <CategoryRow>
            {displayCategories.map((cat, idx) => {
                const name = typeof cat === 'string' ? cat : cat.name
                const image = typeof cat === 'object' ? cat.image : null
                const emoji = typeof cat === 'object' ? cat.emoji : null

                const isSelected = selectedCategory && (selectedCategory._id === cat._id || selectedCategory.name === name)
                
                return (
                    <CategoryPill 
                        key={name + idx} 
                        onClick={() => onSelectCategory(cat)}
                        style={{ opacity: selectedCategory ? (isSelected ? 1 : 0.5) : 1 }}
                    >
                        <CategoryCircle $primaryColor={primary} style={image ? { background: "#f8fafc", borderColor: "#e2e8f0" } : {}}>
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
