import React from "react"
import OrdersTabView from "./OrdersTabView"
import useOrdersTabState from "./useOrdersTabState"

export default function OrdersTab({ website, onUpdate }) {
    const state = useOrdersTabState(website, onUpdate)
    return <OrdersTabView {...state} />
}
