import React from "react"
import {
    DrawerOverlay, DrawerPanel, DrawerHeader, DrawerTitle, CloseButton, DrawerBody, EmptyState,
    CartList, CartItemCard, CartImageWrap, CartImage, CartMeta, CartName, CartSub, CartPrice,
    CartActions, QtyControl, QtyAction, QtyCount, RemoveButton,
    DrawerFooter, SummaryRow, SummaryLabel, SummaryValue, CheckoutButton
} from "./CartDrawer.styles"

const getCategoryName = (p) => p?.categoryName || (typeof p?.category === "object" ? p?.category?.name : p?.category) || "General"

const toNumber = (v) => Number(v) || 0

const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(toNumber(amount))

export default function CartDrawer({ cartItems = [], primaryColor, onCheckout, onClose, onChangeQuantity, onRemoveItem }) {
    const total = cartItems.reduce((sum, item) => {
        const unitPrice = toNumber(item?.offerPrice || item?.price)
        return sum + unitPrice * (item?.quantity || 0)
    }, 0)

    return (
        <>
            <DrawerOverlay aria-label="Close cart" onClick={onClose} />
            <DrawerPanel aria-label="Shopping cart">
                <DrawerHeader>
                    <DrawerTitle>Your Cart</DrawerTitle>
                    <CloseButton onClick={onClose}>x</CloseButton>
                </DrawerHeader>

                <DrawerBody>
                    {cartItems.length === 0 ? (
                        <EmptyState>No items added yet.</EmptyState>
                    ) : (
                        <CartList>
                            {cartItems.map((item, idx) => (
                                <CartItemCard key={item?._id || item?.id || `${item?.name}-${idx}`}>
                                    <CartImageWrap>
                                        <CartImage src={item?.image} alt={item?.name || "Cart item"} />
                                    </CartImageWrap>

                                    <CartMeta>
                                        <CartSub>{getCategoryName(item)}</CartSub>
                                        <CartName>{item?.name || "Product"}</CartName>
                                        <CartPrice>{formatINR(item?.offerPrice || item?.price)}</CartPrice>

                                        <CartActions>
                                            <QtyControl>
                                                <QtyAction onClick={() => onChangeQuantity?.(item, -1)}>-</QtyAction>
                                                <QtyCount>{item?.quantity || 0}</QtyCount>
                                                <QtyAction onClick={() => onChangeQuantity?.(item, 1)}>+</QtyAction>
                                            </QtyControl>

                                            <RemoveButton onClick={() => onRemoveItem?.(item)}>Remove</RemoveButton>
                                        </CartActions>
                                    </CartMeta>
                                </CartItemCard>
                            ))}
                        </CartList>
                    )}
                </DrawerBody>

                <DrawerFooter>
                    <SummaryRow>
                        <SummaryLabel>Total</SummaryLabel>
                        <SummaryValue>{formatINR(total)}</SummaryValue>
                    </SummaryRow>
                    <CheckoutButton $primary={primaryColor} onClick={onCheckout}>Proceed to Checkout</CheckoutButton>
                </DrawerFooter>
            </DrawerPanel>
        </>
    )
}

