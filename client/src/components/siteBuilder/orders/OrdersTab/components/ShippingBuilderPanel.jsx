import React from "react"
import {
    BuilderSplit, BuilderControls, BuilderPreview, BuilderSectionCard, BuilderSectionHead, BuilderSectionTitle,
    BuilderSectionHint, BuilderControlGroup, BuilderControlBar, BuilderControlLabel, BuilderSwitch, BuilderMiniGrid,
    BuilderMiniField, BuilderMiniInput, BuilderTextarea, BuilderSaveBar, BuilderSaveButton, BuilderSaveText,
    BuilderPreviewPhone, BuilderPreviewTitle, BuilderPreviewField, BuilderPreviewBlock, BuilderPreviewOption
} from "../OrdersTab.styles"

const formatFee = (amount) => (Number(amount) || 0) <= 0 ? "FREE" : `Rs ${Number(amount) || 0}`

export default function ShippingBuilderPanel({ config, onChange, onSave, isSaving, saved }) {
    const shipping = config?.shipping || {}
    const shippingOptions = [
        { enabled: shipping.enablePickup, label: shipping.pickupLabel || "Pick up", fee: Number(shipping.pickupFee) || 0 },
        { enabled: shipping.enableDelivery, label: shipping.deliveryLabel || "Delivery", fee: Number(shipping.shippingFee) || 0 }
    ].filter(option => option.enabled)

    return (
        <BuilderSplit>
            <BuilderControls>
                <BuilderSectionCard>
                    <BuilderSectionHead>
                        <BuilderSectionTitle>Shipping</BuilderSectionTitle>
                        <BuilderSectionHint>These shipping methods are used directly in checkout and on live orders.</BuilderSectionHint>
                    </BuilderSectionHead>

                    <BuilderControlGroup>
                        <BuilderControlBar>Shipping methods</BuilderControlBar>
                        <BuilderControlLabel>
                            <span>Pick up</span>
                            <BuilderSwitch type="checkbox" checked={Boolean(shipping.enablePickup)} onChange={(event) => onChange("shipping", "enablePickup", event.target.checked)} />
                        </BuilderControlLabel>
                        <BuilderMiniGrid>
                            <BuilderMiniField>
                                <span>Label</span>
                                <BuilderMiniInput value={shipping.pickupLabel || ""} onChange={(event) => onChange("shipping", "pickupLabel", event.target.value)} />
                            </BuilderMiniField>
                            <BuilderMiniField>
                                <span>Fee</span>
                                <BuilderMiniInput type="number" value={shipping.pickupFee ?? 0} onChange={(event) => onChange("shipping", "pickupFee", Number(event.target.value) || 0)} />
                            </BuilderMiniField>
                        </BuilderMiniGrid>

                        <BuilderControlLabel>
                            <span>Delivery</span>
                            <BuilderSwitch type="checkbox" checked={Boolean(shipping.enableDelivery)} onChange={(event) => onChange("shipping", "enableDelivery", event.target.checked)} />
                        </BuilderControlLabel>
                        <BuilderMiniGrid>
                            <BuilderMiniField>
                                <span>Label</span>
                                <BuilderMiniInput value={shipping.deliveryLabel || ""} onChange={(event) => onChange("shipping", "deliveryLabel", event.target.value)} />
                            </BuilderMiniField>
                            <BuilderMiniField>
                                <span>Fee</span>
                                <BuilderMiniInput type="number" value={shipping.shippingFee ?? 0} onChange={(event) => onChange("shipping", "shippingFee", Number(event.target.value) || 0)} />
                            </BuilderMiniField>
                        </BuilderMiniGrid>
                    </BuilderControlGroup>

                    <BuilderControlGroup>
                        <BuilderControlBar>Delivery settings</BuilderControlBar>
                        <BuilderMiniGrid>
                            <BuilderMiniField>
                                <span>Free Above</span>
                                <BuilderMiniInput type="number" value={shipping.freeShippingThreshold ?? 0} onChange={(event) => onChange("shipping", "freeShippingThreshold", Number(event.target.value) || 0)} />
                            </BuilderMiniField>
                            <BuilderMiniField>
                                <span>Timeline</span>
                                <BuilderMiniInput value={shipping.deliveryTimeline || ""} onChange={(event) => onChange("shipping", "deliveryTimeline", event.target.value)} />
                            </BuilderMiniField>
                        </BuilderMiniGrid>
                        <BuilderMiniField>
                            <span>Customer Note</span>
                            <BuilderTextarea value={shipping.policyNote || ""} onChange={(event) => onChange("shipping", "policyNote", event.target.value)} />
                        </BuilderMiniField>
                    </BuilderControlGroup>
                </BuilderSectionCard>

                <BuilderSaveBar>
                    <BuilderSaveText>{saved ? "Shipping settings saved to checkout." : "Save changes to use these shipping methods in checkout and live orders."}</BuilderSaveText>
                    <BuilderSaveButton onClick={onSave} disabled={isSaving}>{isSaving ? "Saving..." : saved ? "Saved" : "Save Changes"}</BuilderSaveButton>
                </BuilderSaveBar>
            </BuilderControls>

            <BuilderPreview>
                <BuilderPreviewPhone>
                    <BuilderPreviewTitle>Shipping in checkout</BuilderPreviewTitle>
                    <BuilderPreviewField>Customer name</BuilderPreviewField>
                    <BuilderPreviewField>Phone number</BuilderPreviewField>
                    <BuilderPreviewBlock>Shipping</BuilderPreviewBlock>
                    {shippingOptions.map(option => (
                        <BuilderPreviewOption key={option.label}>
                            <span>{option.label}</span>
                            <span>{formatFee(option.fee)}</span>
                        </BuilderPreviewOption>
                    ))}
                    {shipping.freeShippingThreshold > 0 && <BuilderPreviewField>Free delivery above Rs {shipping.freeShippingThreshold}</BuilderPreviewField>}
                    <BuilderPreviewBlock>Delivery promise</BuilderPreviewBlock>
                    <BuilderPreviewField>{shipping.deliveryTimeline || "3-5 business days"}</BuilderPreviewField>
                    <BuilderPreviewField>{shipping.policyNote || "Tracking details are shared after dispatch."}</BuilderPreviewField>
                </BuilderPreviewPhone>
            </BuilderPreview>
        </BuilderSplit>
    )
}
