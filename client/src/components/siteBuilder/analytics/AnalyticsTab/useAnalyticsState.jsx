import { useEffect, useState } from "react"
import api from "../../../../services/api"

export const RANGES = ["Today", "This Week", "This Month", "All Time"]

function buildSummary(summary, totalOrders, totalRevenue) {
    return {
        ...summary,
        totalOrders,
        totalRevenue,
        avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
    }
}

function filterByRange(data, range) {
    if (!data) return null

    const summary = data.summary || {}

    if (range === "Today") {
        return {
            ...data,
            summary: buildSummary(summary, summary.ordersToday, summary.revenueToday),
            dailyTrend: data.weeklyTrend?.slice(-1) || []
        }
    }

    if (range === "This Week") {
        return {
            ...data,
            summary: buildSummary(summary, summary.ordersThisWeek, summary.revenueThisWeek),
            dailyTrend: data.weeklyTrend || []
        }
    }

    if (range === "This Month") {
        return {
            ...data,
            summary: buildSummary(summary, summary.ordersThisMonth, summary.revenueThisMonth)
        }
    }

    return data
}

export default function useAnalyticsState(website) {
    const [rawData, setRawData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [range, setRange] = useState("All Time")

    useEffect(() => {
        if (!website?._id) return

        setLoading(true)
        setError("")

        api.get(`/websites/${website._id}/analytics`)
            .then(res => setRawData(res.data))
            .catch(err => setError(err?.response?.data?.message || "Failed to load analytics"))
            .finally(() => setLoading(false))
    }, [website?._id])

    return {
        data: filterByRange(rawData, range),
        loading,
        error,
        range,
        setRange,
        ranges: RANGES
    }
}
