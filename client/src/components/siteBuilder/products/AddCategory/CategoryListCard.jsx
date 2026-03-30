import React from "react"
import { FormCard, FormTitle, CategoryItem, CategoryInfo, EditIconButton, EditCategoryIcon } from "../ProductsTab/ProductsTab.styles"

export default function CategoryListCard({ categories, onEdit }) {
    if (!categories.length) return null

    return (
        <FormCard>
            <FormTitle>Existing Categories</FormTitle>
            {categories.map((category, index) => {
                const name = typeof category === "string" ? category : category.name
                const image = typeof category === "object" ? category.image : null
                return (
                    <CategoryItem key={index} onClick={() => onEdit(index, category)}>
                        <CategoryInfo>
                            {image ? <img src={image} alt={name} /> : <div className="placeholder" />}
                            <span>{name}</span>
                        </CategoryInfo>
                        <EditIconButton type="button" onClick={event => { event.stopPropagation(); onEdit(index, category) }}>
                            <EditCategoryIcon />
                        </EditIconButton>
                    </CategoryItem>
                )
            })}
        </FormCard>
    )
}
