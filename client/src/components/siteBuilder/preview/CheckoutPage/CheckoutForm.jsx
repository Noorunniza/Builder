import React from "react"
import {
    CheckoutCard, CheckoutTitle, CheckoutSub, SectionTitle, FieldGrid, FullWidth, Label, Input, TextArea,
    ShippingRow, ShippingOption, ShippingMeta, ShippingName, ShippingHint, ShippingPrice, SectionNote,
    PaymentRow, PaymentOption, PlaceOrderButton, ErrorText
} from "./CheckoutPage.styles"
import { formatINR } from "./checkoutUtils"

export default function CheckoutForm({
    form,
    shippingOptions,
    shippingMethod,
    paymentOptions,
    paymentMethod,
    primaryColor,
    checkoutSettings,
    shippingSettings,
    error,
    submitting,
    onFieldChange,
    onShippingChange,
    onPaymentChange,
    onPlaceOrder
}) {
    return (
        <CheckoutCard>
            <CheckoutTitle>Checkout</CheckoutTitle>
            <CheckoutSub>{checkoutSettings.helperText || "Enter delivery details and confirm your order."}</CheckoutSub>

            <SectionTitle>Contact Details</SectionTitle>
            <FieldGrid>
                {[
                    ["firstName", "First Name", "First name"],
                    ["lastName", "Last Name", "Last name"],
                    ["email", "Email", "name@example.com"],
                    ["phone", "Phone", "+91 98765 43210"]
                ].map(([field, label, placeholder]) => (
                    <div key={field}>
                        <Label>{label}</Label>
                        <Input value={form[field]} onChange={onFieldChange(field)} placeholder={placeholder} />
                    </div>
                ))}
            </FieldGrid>

            <SectionTitle>Shipping Address</SectionTitle>
            <FullWidth>
                <Label>Address</Label>
                <TextArea value={form.address} onChange={onFieldChange("address")} placeholder="House number, street, landmark" />
            </FullWidth>
            <FieldGrid>
                {[
                    ["city", "City", "City"],
                    ["state", "State", "State"],
                    ["pincode", "Pincode", "400001"],
                    ["country", "Country", "India"]
                ].map(([field, label, placeholder]) => (
                    <div key={field}>
                        <Label>{label}</Label>
                        <Input value={form[field]} onChange={onFieldChange(field)} placeholder={placeholder} />
                    </div>
                ))}
            </FieldGrid>

            <SectionTitle>Shipping Method</SectionTitle>
            <ShippingRow>
                {shippingOptions.map(option => (
                    <ShippingOption key={option.code} $active={shippingMethod === option.code} $primary={primaryColor} onClick={() => onShippingChange(option.code)}>
                        <ShippingMeta>
                            <ShippingName>{option.label}</ShippingName>
                            <ShippingHint>{option.hint}</ShippingHint>
                        </ShippingMeta>
                        <ShippingPrice>{option.fee <= 0 ? "FREE" : formatINR(option.fee)}</ShippingPrice>
                    </ShippingOption>
                ))}
            </ShippingRow>
            {shippingSettings.policyNote && <SectionNote>{shippingSettings.policyNote}</SectionNote>}

            <SectionTitle>Payment Method</SectionTitle>
            <PaymentRow>
                {paymentOptions.map(option => (
                    <PaymentOption key={option.value} $active={paymentMethod === option.value} $primary={primaryColor} onClick={() => onPaymentChange(option.value)}>
                        {option.label}
                    </PaymentOption>
                ))}
            </PaymentRow>

            {error && <ErrorText>{error}</ErrorText>}
            <PlaceOrderButton $primary={primaryColor} onClick={onPlaceOrder} disabled={submitting}>
                {submitting ? "Placing Order..." : checkoutSettings.buttonLabel || "Place Order"}
            </PlaceOrderButton>
        </CheckoutCard>
    )
}
