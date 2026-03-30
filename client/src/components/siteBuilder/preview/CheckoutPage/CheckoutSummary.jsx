import React from "react"
import {
    OrderCard, SectionTitle, SummaryList, SummaryItem, SummaryImage, SummaryMeta,
    SummaryName, SummaryQty, SummaryPrice, Totals, TotalRow, TotalLabel, TotalValue
} from "./CheckoutPage.styles"
import { formatINR, toNumber } from "./checkoutUtils"

export default function CheckoutSummary({ cartItems, selectedShippingOption, shipping, subtotal, total }) {
    return (
        <OrderCard>
            <SectionTitle>Order Summary</SectionTitle>

            <SummaryList>
                {cartItems.map((item, idx) => (
                    <SummaryItem key={item?._id || item?.id || `${item?.name}-${idx}`}>
                        <SummaryImage src={item?.image} alt={item?.name || "Product"} />
                        <SummaryMeta>
                            <SummaryName>{item?.name || "Product"}</SummaryName>
                            <SummaryQty>Qty {item?.quantity || 0}</SummaryQty>
                            <SummaryPrice>{formatINR(toNumber(item?.offerPrice || item?.price) * (item?.quantity || 0))}</SummaryPrice>
                        </SummaryMeta>
                    </SummaryItem>
                ))}
            </SummaryList>

            <Totals>
                <TotalRow>
                    <TotalLabel>Subtotal</TotalLabel>
                    <TotalValue>{formatINR(subtotal)}</TotalValue>
                </TotalRow>
                <TotalRow>
                    <TotalLabel>{selectedShippingOption?.label || "Shipping"}</TotalLabel>
                    <TotalValue>{shipping <= 0 ? "FREE" : formatINR(shipping)}</TotalValue>
                </TotalRow>
                <TotalRow>
                    <TotalLabel $strong>Total</TotalLabel>
                    <TotalValue $strong>{formatINR(total)}</TotalValue>
                </TotalRow>
            </Totals>
        </OrderCard>
    )
}
