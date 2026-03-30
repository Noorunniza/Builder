import React from "react"
import {
    BuilderSplit, BuilderControls, BuilderPreview, BuilderSectionCard, BuilderSectionHead, BuilderSectionTitle,
    BuilderSectionHint, BuilderControlGroup, BuilderControlBar, BuilderControlLabel, BuilderSwitch, BuilderPreviewPhone,
    BuilderPreviewTitle, BuilderPreviewField, BuilderPreviewBlock, BuilderPreviewOption, BuilderSaveBar, BuilderSaveButton,
    BuilderSaveText
} from "../OrdersTab.styles"

const sampleOptions = [
    { key: "showName", label: "Name", placeholder: "Name" },
    { key: "showEmail", label: "Email", placeholder: "E-mail" },
    { key: "showPhone", label: "Phone", placeholder: "Phone" },
    { key: "showAddress", label: "Address", placeholder: "Address" }
]

export default function CheckoutBuilderPanel({ config, onChange, onSave, isSaving, saved }) {
    const checkout = config?.checkout || {}
    const shipping = config?.shipping || {}
    const payments = config?.payments || {}
    const shippingOptions = [
        { enabled: shipping.enablePickup, label: shipping.pickupLabel || "Pick up", fee: Number(shipping.pickupFee) || 0 },
        { enabled: shipping.enableDelivery, label: shipping.deliveryLabel || "Delivery", fee: Number(shipping.shippingFee) || 0 }
    ].filter(option => option.enabled)
    const paymentOptions = [
        payments.enableCod ? "Cash on Delivery" : null,
        payments.enableCard ? "Card Payment" : null,
        payments.enableUpi ? "UPI" : null
    ].filter(Boolean)

    return (
        <BuilderSplit>
            <BuilderControls>
                <BuilderSectionCard>
                    <BuilderSectionHead>
                        <BuilderSectionTitle>Checkout</BuilderSectionTitle>
                        <BuilderSectionHint>Configure the fields shown to customers. Shipping and payment stay connected to their own tabs.</BuilderSectionHint>
                    </BuilderSectionHead>

                    <BuilderControlGroup>
                        <BuilderControlBar>Form fields to display</BuilderControlBar>
                        {sampleOptions.map(field => (
                            <BuilderControlLabel key={field.key}>
                                <span>{field.label}</span>
                                <BuilderSwitch type="checkbox" checked={Boolean(checkout[field.key])} onChange={(event) => onChange("checkout", field.key, event.target.checked)} />
                            </BuilderControlLabel>
                        ))}
                    </BuilderControlGroup>

                    <BuilderControlGroup>
                        <BuilderControlBar>Connected sections</BuilderControlBar>
                        <BuilderSectionHint>Shipping methods come from the Shipping tab. Payment methods come from the Payments tab.</BuilderSectionHint>
                    </BuilderControlGroup>
                </BuilderSectionCard>

                <BuilderSaveBar>
                    <BuilderSaveText>{saved ? "Checkout builder settings saved." : "Save changes to keep this checkout setup in your builder."}</BuilderSaveText>
                    <BuilderSaveButton onClick={onSave} disabled={isSaving}>{isSaving ? "Saving..." : saved ? "Saved" : "Save Changes"}</BuilderSaveButton>
                </BuilderSaveBar>
            </BuilderControls>

            <BuilderPreview>
                <BuilderPreviewPhone>
                    <BuilderPreviewTitle>Checkout details</BuilderPreviewTitle>
                    {sampleOptions.filter(field => checkout[field.key]).map(field => <BuilderPreviewField key={field.key}>{field.placeholder}</BuilderPreviewField>)}
                    <BuilderPreviewBlock>Shipping</BuilderPreviewBlock>
                    {shippingOptions.map(option => <BuilderPreviewOption key={option.label}><span>{option.label}</span><span>{option.fee <= 0 ? "FREE" : `Rs ${option.fee}`}</span></BuilderPreviewOption>)}
                    <BuilderPreviewBlock>Payment</BuilderPreviewBlock>
                    {paymentOptions.map(option => <BuilderPreviewOption key={option}><span>{option}</span><span>Enabled</span></BuilderPreviewOption>)}
                </BuilderPreviewPhone>
            </BuilderPreview>
        </BuilderSplit>
    )
}
