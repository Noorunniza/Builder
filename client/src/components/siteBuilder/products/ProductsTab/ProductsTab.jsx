import React from "react"
import ProductsTabContent from "./ProductsTabContent"
import useProductsTabState from "./useProductsTabState"

export default function ProductsTab({ website, onUpdate }) {
    const state = useProductsTabState(website, onUpdate)
    return <ProductsTabContent state={state} />
}
