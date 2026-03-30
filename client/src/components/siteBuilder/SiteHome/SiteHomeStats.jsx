import React from "react"
import {
    CardsRow, StatCard, CardIcon, CardLabel, CardValue, CardSub
} from "./SiteHome.styles"

const formatCurrency = value => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value) || 0)

export default function SiteHomeStats({ analytics }) {
    return (
        <CardsRow>
            <StatCard>
                <CardIcon>Rs</CardIcon>
                <CardLabel>Total Revenue</CardLabel>
                <CardValue>{analytics ? formatCurrency(analytics.totalRevenue) : "Rs -"}</CardValue>
            </StatCard>
            <StatCard>
                <CardIcon>Orders</CardIcon>
                <CardLabel>Total Orders</CardLabel>
                <CardValue>{analytics ? analytics.totalOrders : "-"}</CardValue>
                {analytics && <CardSub>{analytics.pendingOrders} pending</CardSub>}
            </StatCard>
            <StatCard>
                <CardIcon>Items</CardIcon>
                <CardLabel>Products Listed</CardLabel>
                <CardValue>{analytics ? analytics.totalProducts : "-"}</CardValue>
            </StatCard>
        </CardsRow>
    )
}
