import React, { useState } from "react"
import { Plus } from "lucide-react"
import {
    ProductSection, ProductSectionTitle, ProductGrid,
    ProductCard, ProductImage, ProductBadge, ProductInfo,
    ProductImageTag, ProductImageEmpty,
    ProductName, ProductPrice, ProductDiscount, ProductOldPrice, ProductNewPrice,
    SubcategoryFilterRow, SubcategoryPill,
    ViewMoreCard, ViewMoreText
} from "./Products.styles"

export default function Products({ products = [], categories = [], selectedCategory, selectedSubcategory, onSelectSubcategory, primaryColor, device = "desktop" }) {
    
    // State to track which categories are expanded past the 3-item limit
    const [expandedCategories, setExpandedCategories] = useState({})

    const handleExpand = (categoryName) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryName]: true
        }))
    }

    // Group products by category
    const productsByCategory = products.reduce((acc, p) => {
        const catName = p.categoryName || (typeof p.category === 'object' ? p.category.name : p.category) || "Unknown"
        if (!acc[catName]) acc[catName] = []
        acc[catName].push(p)
        return acc
    }, {})

    return (
        <>
            {categories.map((cat) => {
                const categoryName = typeof cat === 'string' ? cat : cat.name;
                const categoryProducts = productsByCategory[categoryName] || [];
                
                // If there are no products in this category, we might skip rendering it
                if (categoryProducts.length === 0) return null;

                // If a category is selected, only show that category
                if (selectedCategory && selectedCategory.name !== categoryName) return null;
                
                // If this is the selected category and it has subcategories, display pills
                const isSelectedCategory = selectedCategory && selectedCategory.name === categoryName;
                const subcategories = selectedCategory?.subcategories || [];

                // Filter products by subcategory
                const filteredProducts = categoryProducts.filter(p => {
                    if (!isSelectedCategory) return true; // not filtering if no categoroy selected
                    if (selectedSubcategory === "All") return true;
                    return p.subcategory === selectedSubcategory;
                });

                const isExpanded = expandedCategories[categoryName];
                const maxCardsPerRow = device === "mobile" ? 2 : 3
                const visibleProductSlots = maxCardsPerRow - 1
                const shouldTruncate = !isExpanded && filteredProducts.length > maxCardsPerRow
                const displayProducts = shouldTruncate
                    ? filteredProducts.slice(0, visibleProductSlots)
                    : filteredProducts
                const remainingCount = filteredProducts.length - visibleProductSlots

                return (
                    <ProductSection key={categoryName}>
                        <ProductSectionTitle>{categoryName}</ProductSectionTitle>
                        
                        {isSelectedCategory && subcategories.length > 0 && (
                            <SubcategoryFilterRow>
                                <SubcategoryPill 
                                    $active={selectedSubcategory === "All"} 
                                    $primaryColor={primaryColor}
                                    onClick={() => onSelectSubcategory("All")}
                                >
                                    All
                                </SubcategoryPill>
                                {subcategories.map(sub => (
                                    <SubcategoryPill 
                                        key={sub}
                                        $active={selectedSubcategory === sub} 
                                        $primaryColor={primaryColor}
                                        onClick={() => onSelectSubcategory(sub)}
                                    >
                                        {sub}
                                    </SubcategoryPill>
                                ))}
                            </SubcategoryFilterRow>
                        )}

                        <ProductGrid $device={device}>
                            {displayProducts.map(p => (
                                <ProductCard key={p.id || p.name}>
                                    <ProductImage $device={device}>
                                        {p.image ? (
                                            <ProductImageTag src={p.image} alt={p.name} />
                                        ) : (
                                            <ProductImageEmpty>No Image</ProductImageEmpty>
                                        )}
                                        {p.status && p.status !== "shown" && (
                                            <ProductBadge>{p.status.replace("_", " ").toUpperCase()}</ProductBadge>
                                        )}
                                    </ProductImage>
                                    <ProductInfo>
                                        <ProductName>{p.name}</ProductName>
                                        <ProductPrice>
                                            {p.offerPrice && Number(p.offerPrice) < Number(p.price) && (
                                                <ProductDiscount>
                                                    +{Math.round(((Number(p.price) - Number(p.offerPrice)) / Number(p.price)) * 100)}%
                                                </ProductDiscount>
                                            )}
                                            {p.offerPrice && Number(p.offerPrice) < Number(p.price) && (
                                                <ProductOldPrice>₹{p.price}</ProductOldPrice>
                                            )}
                                            <ProductNewPrice>₹{p.offerPrice || p.price}</ProductNewPrice>
                                        </ProductPrice>
                                    </ProductInfo>
                                </ProductCard>
                            ))}

                            {shouldTruncate && (
                                <ViewMoreCard $primaryColor={primaryColor} $device={device} onClick={() => handleExpand(categoryName)}>
                                    <Plus size={32} color={primaryColor || "#6366f1"} />
                                    <ViewMoreText $primaryColor={primaryColor}>
                                        View {remainingCount} More
                                    </ViewMoreText>
                                </ViewMoreCard>
                            )}
                        </ProductGrid>
                    </ProductSection>
                )
            })}
        </>
    )
}
