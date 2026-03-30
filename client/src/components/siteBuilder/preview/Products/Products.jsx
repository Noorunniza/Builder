import React, { useState } from "react"
import ProductCategorySection from "./ProductCategorySection"

export default function Products({ products = [], categories = [], selectedCategory, selectedSubcategory, onSelectSubcategory, onProductClick, primaryColor, device = "desktop" }) {
    const [categoryPages, setCategoryPages] = useState({})
    const productsByCategory = products.reduce((grouped, product) => {
        const categoryName = product.categoryName || (typeof product.category === "object" ? product.category.name : product.category) || "Unknown"
        if (!grouped[categoryName]) grouped[categoryName] = []
        grouped[categoryName].push(product)
        return grouped
    }, {})

    return (
        <>
            {categories.map(category => {
                const categoryName = typeof category === "string" ? category : category.name
                const categoryProducts = productsByCategory[categoryName] || []
                if (!categoryProducts.length) return null
                if (selectedCategory && selectedCategory.name !== categoryName) return null

                return (
                    <ProductCategorySection
                        key={categoryName}
                        categoryName={categoryName}
                        products={categoryProducts}
                        subcategories={selectedCategory?.subcategories || []}
                        isSelectedCategory={selectedCategory?.name === categoryName}
                        selectedSubcategory={selectedSubcategory}
                        onSelectSubcategory={onSelectSubcategory}
                        primaryColor={primaryColor}
                        device={device}
                        currentPage={categoryPages[categoryName] || 0}
                        onPageChange={page => setCategoryPages(current => ({ ...current, [categoryName]: page }))}
                        onProductClick={onProductClick}
                    />
                )
            })}
        </>
    )
}
