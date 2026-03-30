import React from "react"
import {
    SummaryStrip,
    SummaryCard,
    SummaryLabel,
    SummaryValue
} from "../OrdersTab.styles"
import { formatINR } from "../orderUtils"

export default function OrdersSummary({ summary }) {
    return (
        <SummaryStrip>
            <SummaryCard>
                <SummaryLabel>Total Orders</SummaryLabel>
                <SummaryValue>{summary.totalOrders}</SummaryValue>
            </SummaryCard>
            <SummaryCard>
                <SummaryLabel>Pending Orders</SummaryLabel>
                <SummaryValue>{summary.pendingOrders}</SummaryValue>
            </SummaryCard>
            <SummaryCard>
                <SummaryLabel>Total Sales</SummaryLabel>
                <SummaryValue>{formatINR(summary.totalSales)}</SummaryValue>
            </SummaryCard>
        </SummaryStrip>
    )
}
