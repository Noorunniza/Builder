import React from "react"
import {
    SuccessWrap, SuccessContainer, SuccessCard, SuccessBadge, SuccessTitle, SuccessText, OrderId,
    SummaryBox, SummaryRow, SummaryLabel, SummaryValue, ContinueButton
} from "./OrderPlacedPage.styles"

const toNumber = (v) => Number(v) || 0

const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(toNumber(amount))

export default function OrderPlacedPage({ order, primaryColor, onContinue }) {
    const itemCount = order?.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0
    const subtotal = order?.subtotal || 0
    const shipping = order?.shipping || 0
    const total = order?.total || 0

    return (
        <SuccessWrap>
            <SuccessContainer>
                <SuccessCard>
                    <SuccessBadge>OK</SuccessBadge>
                    <SuccessTitle>Order Placed Successfully</SuccessTitle>
                    <SuccessText>
                        Your order has been confirmed and saved successfully. The store owner can now see this order in the dashboard.
                    </SuccessText>
                    <OrderId>Order ID {order?.orderId || "ORD-000001"}</OrderId>

                    <SummaryBox>
                        <SummaryRow>
                            <SummaryLabel>Items</SummaryLabel>
                            <SummaryValue>{itemCount}</SummaryValue>
                        </SummaryRow>
                        <SummaryRow>
                            <SummaryLabel>Subtotal</SummaryLabel>
                            <SummaryValue>{formatINR(subtotal)}</SummaryValue>
                        </SummaryRow>
                        <SummaryRow>
                            <SummaryLabel>Shipping</SummaryLabel>
                            <SummaryValue>{formatINR(shipping)}</SummaryValue>
                        </SummaryRow>
                        <SummaryRow $last>
                            <SummaryLabel $strong>Total Paid</SummaryLabel>
                            <SummaryValue $strong>{formatINR(total)}</SummaryValue>
                        </SummaryRow>
                    </SummaryBox>

                    <ContinueButton $primary={primaryColor} onClick={onContinue}>
                        Continue Shopping
                    </ContinueButton>
                </SuccessCard>
            </SuccessContainer>
        </SuccessWrap>
    )
}
