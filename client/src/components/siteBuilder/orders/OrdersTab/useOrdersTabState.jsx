import { useEffect, useMemo, useRef, useState } from "react"
import api from "../../../../services/api"
import { toNumber, matchesRange, getOrderKey } from "./orderUtils"
import { createOrderBuilderConfig } from "./orderBuilderConfig"

const initialSummary = { totalOrders: 0, totalSales: 0, pendingOrders: 0 }

export default function useOrdersTabState(website, onUpdate) {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [activeMainTab, setActiveMainTab] = useState("Orders")
    const [query, setQuery] = useState("")
    const [activeStatusTab, setActiveStatusTab] = useState("All")
    const [topRange, setTopRange] = useState("All Time")
    const [searchRange, setSearchRange] = useState("All Time")
    const [expandedOrderId, setExpandedOrderId] = useState(null)
    const [selectedOrderIds, setSelectedOrderIds] = useState([])
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
    const [nextStatus, setNextStatus] = useState("")
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
    const [builderConfig, setBuilderConfig] = useState(() => createOrderBuilderConfig(website?.config?.orderBuilder))
    const [isSavingBuilder, setIsSavingBuilder] = useState(false)
    const [builderSaved, setBuilderSaved] = useState(false)
    const selectAllRef = useRef(null)

    useEffect(() => {
        if (!website?._id) return

        const fetchOrders = async () => {
            setLoading(true)
            setError("")
            setSelectedOrderIds([])
            setExpandedOrderId(null)

            try {
                const res = await api.get(`/websites/${website._id}/orders`)
                setOrders(res.data.orders || [])
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to load orders")
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [website?._id])

    useEffect(() => {
        setBuilderConfig(createOrderBuilderConfig(website?.config?.orderBuilder))
        setBuilderSaved(false)
    }, [website?.config?.orderBuilder])

    const scopedOrders = useMemo(() => orders.filter(order => matchesRange(order.createdAt, topRange)), [orders, topRange])
    const summary = useMemo(() => scopedOrders.reduce((acc, order) => {
        acc.totalOrders += 1
        acc.totalSales += toNumber(order.total)
        if (order.orderStatus === "pending") acc.pendingOrders += 1
        return acc
    }, { ...initialSummary }), [scopedOrders])

    const filteredOrders = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        return scopedOrders.filter(order => {
            const matchesStatus = activeStatusTab === "All" || order.orderStatus === activeStatusTab.toLowerCase()
            const haystack = [order.orderId, order.customerName, order.customerPhone, order.itemSummary, order.paymentMethod, order.paymentStatus, order.orderStatus].join(" ").toLowerCase()
            return matchesStatus && matchesRange(order.createdAt, searchRange) && (!normalizedQuery || haystack.includes(normalizedQuery))
        })
    }, [scopedOrders, activeStatusTab, searchRange, query])

    const filteredOrderIds = useMemo(() => filteredOrders.map(getOrderKey), [filteredOrders])
    const selectedOrderIdSet = useMemo(() => new Set(selectedOrderIds), [selectedOrderIds])
    const allFilteredSelected = filteredOrderIds.length > 0 && filteredOrderIds.every(id => selectedOrderIdSet.has(id))
    const hasPartialSelection = !allFilteredSelected && filteredOrderIds.some(id => selectedOrderIdSet.has(id))

    useEffect(() => setSelectedOrderIds(current => current.filter(id => filteredOrderIds.includes(id))), [filteredOrderIds])
    useEffect(() => { if (selectAllRef.current) selectAllRef.current.indeterminate = hasPartialSelection }, [hasPartialSelection])
    useEffect(() => { if (!selectedOrderIds.length) { setIsStatusModalOpen(false); setNextStatus("") } }, [selectedOrderIds.length])

    const clearFilters = () => { setQuery(""); setSearchRange("All Time"); setActiveStatusTab("All") }
    const toggleOrderSelection = (orderKey) => setSelectedOrderIds(current => current.includes(orderKey) ? current.filter(id => id !== orderKey) : [...current, orderKey])
    const toggleExpanded = (orderKey) => setExpandedOrderId(current => current === orderKey ? null : orderKey)
    const toggleSelectAll = () => setSelectedOrderIds(allFilteredSelected ? [] : filteredOrderIds)
    const updateBuilderField = (section, field, value) => {
        setBuilderConfig(current => ({
            ...current,
            [section]: {
                ...(current[section] || {}),
                [field]: value
            }
        }))
        setBuilderSaved(false)
    }

    const closeStatusModal = () => {
        if (isUpdatingStatus) return
        setIsStatusModalOpen(false)
        setNextStatus("")
    }

    const saveStatus = async () => {
        if (!website?._id || !selectedOrderIds.length || !nextStatus) return

        setIsUpdatingStatus(true)
        setError("")

        try {
            const res = await api.patch(`/websites/${website._id}/orders/status`, { orderIds: selectedOrderIds, status: nextStatus })
            const updatedMap = new Map((res.data.orders || []).map(order => [getOrderKey(order), order]))
            setOrders(current => current.map(order => updatedMap.get(getOrderKey(order)) || order))
            setSelectedOrderIds([])
            setIsStatusModalOpen(false)
            setNextStatus("")
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update order status")
        } finally {
            setIsUpdatingStatus(false)
        }
    }

    const saveBuilder = async () => {
        if (!website?._id) return

        setIsSavingBuilder(true)
        setError("")

        try {
            const nextConfig = { ...(website?.config || {}), orderBuilder: builderConfig }
            await api.patch(`/websites/${website._id}/config`, nextConfig)
            setBuilderSaved(true)
            if (onUpdate) onUpdate(nextConfig)
            setTimeout(() => setBuilderSaved(false), 1800)
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to save order builder settings")
        } finally {
            setIsSavingBuilder(false)
        }
    }

    return {
        loading, error, activeMainTab, query, activeStatusTab, topRange, searchRange, expandedOrderId, selectedOrderIds,
        isStatusModalOpen, nextStatus, isUpdatingStatus, builderConfig, isSavingBuilder, builderSaved, selectAllRef,
        summary, filteredOrders, selectedOrderIdSet, allFilteredSelected, setActiveMainTab, setQuery, setActiveStatusTab,
        setTopRange, setSearchRange, setSelectedOrderIds, setIsStatusModalOpen, setNextStatus, clearFilters,
        toggleOrderSelection, toggleExpanded, toggleSelectAll, updateBuilderField, closeStatusModal, saveStatus, saveBuilder
    }
}
