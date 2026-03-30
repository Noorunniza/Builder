import { useEffect, useMemo, useRef, useState } from "react"
import api from "../../../../services/api"

function isSameItem(left, right) {
    return (
        (left?._id && right?._id && left._id === right._id) ||
        (left?.id && right?.id && left.id === right.id) ||
        left?.name === right?.name
    )
}

export default function useSitePreviewState({ config, website, persistOrders }) {
    const sections = config?.sections || {}
    const previewContainerRef = useRef(null)
    const [clickedPolicy, setClickedPolicy] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSubcategory, setSelectedSubcategory] = useState("All")
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
    const [placedOrder, setPlacedOrder] = useState(null)

    const currentPage = config?.activePolicy || clickedPolicy || (selectedProduct ? "product" : null) || (isCheckoutOpen ? "checkout" : null) || (placedOrder ? "order-success" : null)
    const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0), [cartItems])
    const cartSubtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (Number(item?.offerPrice || item?.price) || 0) * (item?.quantity || 0), 0), [cartItems])

    useEffect(() => setSelectedSubcategory("All"), [selectedCategory])

    useEffect(() => {
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })

        let element = previewContainerRef.current
        while (element) {
            if (typeof element.scrollTo === "function") element.scrollTo({ top: 0, behavior: "smooth" })
            element = element.parentElement
            if (!element || element === document.body || element === document.documentElement) break
        }
    }, [currentPage])

    const goHome = () => {
        setPlacedOrder(null)
        setIsCheckoutOpen(false)
        setSelectedProduct(null)
        setClickedPolicy(null)
    }

    const openPolicy = key => {
        goHome()
        setClickedPolicy(key)
    }

    const handleAddToCart = (product, quantity) => {
        const qty = Math.max(1, Number(quantity) || 1)
        setCartItems(current => {
            const matchIndex = current.findIndex(item => isSameItem(item, product))
            if (matchIndex === -1) return [...current, { ...product, quantity: qty }]
            return current.map((item, index) => index === matchIndex ? { ...item, quantity: (item.quantity || 0) + qty } : item)
        })
        setIsCartOpen(true)
    }

    const handleCartQuantityChange = (targetItem, delta) => {
        setCartItems(current => current
            .map(item => isSameItem(item, targetItem) ? { ...item, quantity: Math.max(0, (item.quantity || 0) + delta) } : item)
            .filter(item => (item.quantity || 0) > 0))
    }

    const handleCartRemove = targetItem => setCartItems(current => current.filter(item => !isSameItem(item, targetItem)))

    const handlePlaceOrder = async checkoutData => {
        const shippingAmount = Number(checkoutData?.shippingAmount) || 0
        const fallbackOrder = {
            orderId: `ORD-${Date.now().toString().slice(-6)}`,
            customer: checkoutData.customer,
            shippingAddress: checkoutData.shippingAddress,
            items: cartItems,
            subtotal: cartSubtotal,
            shipping: shippingAmount,
            total: cartSubtotal + shippingAmount,
            paymentMethod: checkoutData.paymentMethod,
            shippingMethod: checkoutData.shippingMethod
        }

        if (persistOrders && website?.subdomain) {
            const payload = {
                customer: checkoutData.customer,
                shippingAddress: checkoutData.shippingAddress,
                paymentMethod: checkoutData.paymentMethod,
                shippingMethod: checkoutData.shippingMethod,
                items: cartItems.map(item => ({ productId: item?._id || item?.id, quantity: Math.max(1, item?.quantity || 1) }))
            }
            const res = await api.post(`/websites/subdomain/${website.subdomain}/orders`, payload)
            setPlacedOrder(res.data.order)
        } else {
            setPlacedOrder(fallbackOrder)
        }

        setCartItems([])
        setIsCartOpen(false)
        setIsCheckoutOpen(false)
    }

    return {
        sections,
        previewContainerRef,
        clickedPolicy,
        selectedCategory,
        selectedSubcategory,
        selectedProduct,
        cartItems,
        isCartOpen,
        isCheckoutOpen,
        placedOrder,
        currentPage,
        cartCount,
        handleAddToCart,
        handleCartQuantityChange,
        handleCartRemove,
        handlePlaceOrder,
        setClickedPolicy,
        setSelectedCategory,
        setSelectedSubcategory,
        setSelectedProduct,
        setIsCartOpen,
        setIsCheckoutOpen,
        setPlacedOrder,
        goHome,
        openPolicy
    }
}
