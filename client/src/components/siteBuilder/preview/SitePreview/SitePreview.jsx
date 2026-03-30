import React from "react"
import Marquee from "react-fast-marquee"
import { PreviewRoot, Bar, DEFAULT_PRIMARY_COLOR } from "./SitePreview.styles"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import CartDrawer from "../CartDrawer/CartDrawer"
import SitePreviewContent from "./SitePreviewContent"
import useSitePreviewState from "./useSitePreviewState"

export default function SitePreview({ device = "desktop", config, website, persistOrders = false }) {
    const header = config?.header || {}
    const banner = config?.banner || {}
    const theme = config?.theme || {}
    const orderBuilder = config?.orderBuilder || {}
    const activePolicy = config?.activePolicy
    const storeName = banner.storeName || website?.name || "My Store"
    const tagline = banner.tagline || website?.industry || ""
    const primary = theme.primaryColor || DEFAULT_PRIMARY_COLOR
    const marqueeSpeed = device === "mobile" ? 24 : 32

    const state = useSitePreviewState({ config, website, persistOrders })
    const categoryMatcher = cat => state.selectedCategory && (state.selectedCategory._id === cat._id || state.selectedCategory.name === cat.name)

    return (
        <PreviewRoot ref={state.previewContainerRef}>
            {header.message && <Bar $bg={header.bgColor} $color={header.textColor}><Marquee speed={marqueeSpeed} gradient={false} pauseOnHover>{header.message}</Marquee></Bar>}
            <Navbar
                device={device}
                headerConfig={header}
                storeName={storeName}
                currentPage={state.currentPage}
                primaryColor={primary}
                onGoHome={state.goHome}
                onCartClick={() => state.setIsCartOpen(true)}
                products={config?.products || []}
                cartCount={state.cartCount}
            />
            <SitePreviewContent
                device={device}
                config={config}
                website={website}
                primary={primary}
                storeName={storeName}
                tagline={tagline}
                sections={state.sections}
                orderBuilder={orderBuilder}
                activePolicy={activePolicy}
                clickedPolicy={state.clickedPolicy}
                selectedCategory={state.selectedCategory}
                selectedSubcategory={state.selectedSubcategory}
                selectedProduct={state.selectedProduct}
                cartItems={state.cartItems}
                isCheckoutOpen={state.isCheckoutOpen}
                placedOrder={state.placedOrder}
                onSelectCategory={cat => state.setSelectedCategory(current => categoryMatcher(cat) ? null : cat)}
                onSelectSubcategory={state.setSelectedSubcategory}
                onSelectProduct={state.setSelectedProduct}
                onAddToCart={state.handleAddToCart}
                onPlaceOrder={state.handlePlaceOrder}
                onCheckoutBack={() => { state.setIsCheckoutOpen(false); state.setIsCartOpen(true) }}
                onOrderContinue={() => { state.setPlacedOrder(null); state.setSelectedProduct(null); state.setClickedPolicy(null) }}
            />
            {state.isCartOpen && (
                <CartDrawer
                    cartItems={state.cartItems}
                    primaryColor={primary}
                    onCheckout={() => { state.setIsCartOpen(false); state.setIsCheckoutOpen(true) }}
                    onClose={() => state.setIsCartOpen(false)}
                    onChangeQuantity={state.handleCartQuantityChange}
                    onRemoveItem={state.handleCartRemove}
                />
            )}
            <Footer config={config} storeName={storeName} primaryColor={primary} currentPage={state.currentPage} onPolicyClick={state.openPolicy} />
        </PreviewRoot>
    )
}
