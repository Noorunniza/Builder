import React, { useEffect, useMemo, useState } from "react"
import { CheckoutWrap, CheckoutContainer, CheckoutBack, CheckoutGrid } from "./CheckoutPage.styles"
import CheckoutForm from "./CheckoutForm"
import CheckoutSummary from "./CheckoutSummary"
import { getPaymentOptions, getShippingOptions, initialForm, toNumber } from "./checkoutUtils"

export default function CheckoutPage({ cartItems = [], primaryColor, device = "desktop", orderBuilder = {}, onBack, onPlaceOrder }) {
    const checkoutSettings = orderBuilder?.checkout || {}
    const shippingSettings = orderBuilder?.shipping || {}
    const paymentSettings = orderBuilder?.payments || {}
    const [form, setForm] = useState(initialForm)
    const [paymentMethod, setPaymentMethod] = useState("cod")
    const [shippingMethod, setShippingMethod] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")

    const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + toNumber(item?.offerPrice || item?.price) * (item?.quantity || 0), 0), [cartItems])
    const shippingOptions = useMemo(() => getShippingOptions(shippingSettings, subtotal), [shippingSettings, subtotal])
    const paymentOptions = useMemo(() => getPaymentOptions(paymentSettings), [paymentSettings])

    useEffect(() => {
        setShippingMethod(current => shippingOptions.some(option => option.code === current) ? current : (shippingOptions[0]?.code || ""))
    }, [shippingOptions])

    useEffect(() => {
        setPaymentMethod(current => paymentOptions.some(option => option.value === current) ? current : paymentOptions[0].value)
    }, [paymentOptions])

    const selectedShippingOption = shippingOptions.find(option => option.code === shippingMethod) || shippingOptions[0]
    const shipping = cartItems.length > 0 ? toNumber(selectedShippingOption?.fee) : 0
    const total = subtotal + shipping
    const handleFieldChange = field => event => setForm(prev => ({ ...prev, [field]: event.target.value }))

    const handlePlaceOrder = async () => {
        if (!cartItems.length) return setError("Your cart is empty.")
        if (!form.firstName || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
            return setError("Fill the required contact and shipping fields before placing the order.")
        }
        if (!selectedShippingOption) return setError("Select a shipping method before placing the order.")
        if (checkoutSettings.requireEmail && !form.email) return setError("Email is required before placing the order.")

        setSubmitting(true)
        setError("")

        try {
            await onPlaceOrder?.({
                customer: { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone },
                shippingAddress: { address: form.address, city: form.city, state: form.state, pincode: form.pincode, country: form.country || "India" },
                paymentMethod,
                shippingMethod: selectedShippingOption.code,
                shippingAmount: shipping,
                shippingLabel: selectedShippingOption.label
            })
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Failed to place order")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <CheckoutWrap>
            <CheckoutContainer>
                <CheckoutBack onClick={onBack}>Back to cart</CheckoutBack>
                <CheckoutGrid $device={device} $columns={checkoutSettings.layoutColumns || "2"}>
                    <CheckoutForm
                        form={form}
                        shippingOptions={shippingOptions}
                        shippingMethod={shippingMethod}
                        paymentOptions={paymentOptions}
                        paymentMethod={paymentMethod}
                        primaryColor={primaryColor}
                        checkoutSettings={checkoutSettings}
                        shippingSettings={shippingSettings}
                        error={error}
                        submitting={submitting}
                        onFieldChange={handleFieldChange}
                        onShippingChange={setShippingMethod}
                        onPaymentChange={setPaymentMethod}
                        onPlaceOrder={handlePlaceOrder}
                    />
                    <CheckoutSummary
                        cartItems={cartItems}
                        selectedShippingOption={selectedShippingOption}
                        shipping={shipping}
                        subtotal={subtotal}
                        total={total}
                    />
                </CheckoutGrid>
            </CheckoutContainer>
        </CheckoutWrap>
    )
}
