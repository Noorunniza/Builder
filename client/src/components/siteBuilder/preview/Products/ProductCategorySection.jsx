import React from "react"
import {
    ProductSection, ProductSectionTitle, ProductGrid, ProductCard, ProductImage, ProductBadge, ProductInfo,
    ProductImageTag, ProductImageEmpty, ProductName, ProductPrice, ProductDiscount, ProductOldPrice, ProductNewPrice,
    SubcategoryFilterRow, SubcategoryPill, PaginationRow, PageButton, PageText, PrevPageIcon, NextPageIcon
} from "./Products.styles"

export default function ProductCategorySection({
    categoryName, products, subcategories, isSelectedCategory, selectedSubcategory,
    onSelectSubcategory, primaryColor, device, currentPage, onPageChange, onProductClick
}) {
    const cardsPerPage = device === "mobile" ? 2 : 4
    const filteredProducts = products.filter(product => !isSelectedCategory || selectedSubcategory === "All" || product.subcategory === selectedSubcategory)
    const totalPages = Math.ceil(filteredProducts.length / cardsPerPage)
    const safePage = Math.min(currentPage, Math.max(0, totalPages - 1))
    const visibleProducts = filteredProducts.slice(safePage * cardsPerPage, (safePage + 1) * cardsPerPage)

    return (
        <ProductSection>
            <ProductSectionTitle>{categoryName}</ProductSectionTitle>
            {isSelectedCategory && subcategories.length > 0 && (
                <SubcategoryFilterRow>
                    <SubcategoryPill $active={selectedSubcategory === "All"} $primaryColor={primaryColor} onClick={() => onSelectSubcategory("All")}>All</SubcategoryPill>
                    {subcategories.map(sub => <SubcategoryPill key={sub} $active={selectedSubcategory === sub} $primaryColor={primaryColor} onClick={() => { onSelectSubcategory(sub); onPageChange(0) }}>{sub}</SubcategoryPill>)}
                </SubcategoryFilterRow>
            )}
            <ProductGrid $device={device}>
                {visibleProducts.map(product => (
                    <ProductCard key={product.id || product.name} onClick={() => onProductClick?.(product)}>
                        <ProductImage $device={device}>
                            {product.image ? <ProductImageTag src={product.image} alt={product.name} /> : <ProductImageEmpty>No Image</ProductImageEmpty>}
                            {product.status && product.status !== "shown" && <ProductBadge>{product.status.replace("_", " ").toUpperCase()}</ProductBadge>}
                        </ProductImage>
                        <ProductInfo>
                            <ProductName>{product.name}</ProductName>
                            <ProductPrice>
                                {product.offerPrice && Number(product.offerPrice) < Number(product.price) && <ProductDiscount>+{Math.round(((Number(product.price) - Number(product.offerPrice)) / Number(product.price)) * 100)}%</ProductDiscount>}
                                {product.offerPrice && Number(product.offerPrice) < Number(product.price) && <ProductOldPrice>Rs{product.price}</ProductOldPrice>}
                                <ProductNewPrice>Rs{product.offerPrice || product.price}</ProductNewPrice>
                            </ProductPrice>
                        </ProductInfo>
                    </ProductCard>
                ))}
            </ProductGrid>
            {totalPages > 1 && (
                <PaginationRow>
                    <PageButton $primaryColor={primaryColor} disabled={safePage === 0} onClick={() => onPageChange(safePage - 1)}><PrevPageIcon /></PageButton>
                    <PageText>Page {safePage + 1} of {totalPages}</PageText>
                    <PageButton $primaryColor={primaryColor} disabled={safePage >= totalPages - 1} onClick={() => onPageChange(safePage + 1)}><NextPageIcon /></PageButton>
                </PaginationRow>
            )}
        </ProductSection>
    )
}
