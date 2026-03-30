import React from "react"
import Hero from "../Hero/Hero"
import Category from "../Category/Category"
import Products from "../Products/Products"
import PolicyPage from "../PolicyPage/PolicyPage"
import ProductDetails from "../ProductDetails/ProductDetails"
import CheckoutPage from "../CheckoutPage/CheckoutPage"
import OrderPlacedPage from "../OrderPlacedPage/OrderPlacedPage"

export default function SitePreviewContent({
    device,
    config,
    website,
    primary,
    storeName,
    tagline,
    sections,
    orderBuilder,
    activePolicy,
    clickedPolicy,
    selectedCategory,
    selectedSubcategory,
    selectedProduct,
    cartItems,
    isCheckoutOpen,
    placedOrder,
    onSelectCategory,
    onSelectSubcategory,
    onSelectProduct,
    onAddToCart,
    onPlaceOrder,
    onCheckoutBack,
    onOrderContinue
}) {
    const banner = config?.banner || {}
    const policyKey = activePolicy || clickedPolicy
    const policy = policyKey ? sections[policyKey] : null

    if (placedOrder) {
        return <OrderPlacedPage order={placedOrder} primaryColor={primary} onContinue={onOrderContinue} />
    }

    if (isCheckoutOpen) {
        return <CheckoutPage cartItems={cartItems} primaryColor={primary} device={device} orderBuilder={orderBuilder} onPlaceOrder={onPlaceOrder} onBack={onCheckoutBack} />
    }

    if (selectedProduct) {
        return (
            <ProductDetails
                product={selectedProduct}
                products={config?.products || []}
                primaryColor={primary}
                device={device}
                onAddToCart={onAddToCart}
                onBack={() => onSelectProduct(null)}
                onSelectProduct={onSelectProduct}
            />
        )
    }

    if (policyKey && (policy || policyKey === "location")) {
        return <PolicyPage currentPage={policyKey} policy={policy} contactData={sections.contact || {}} storeName={storeName} bannerAddress={banner.address} />
    }

    return (
        <>
            <Hero bannerConfig={banner} storeName={storeName} tagline={tagline} />
            <Category
                categories={config?.categories || []}
                primaryColor={primary}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
            />
            <Products
                products={config?.products || []}
                categories={config?.categories || []}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onSelectSubcategory={onSelectSubcategory}
                onProductClick={onSelectProduct}
                primaryColor={primary}
                device={device}
            />
        </>
    )
}
