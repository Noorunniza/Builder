import React, { useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import api from "../../services/api"

import WebsiteSidebar from "../../components/dashboard/WebsiteSidebar/WebsiteSidebar"
import {
    Layout,
    Content,
    Main,
    LoadingScreen,
    ComingSoon,
    ComingSoonTitle,
    ComingSoonSub
} from "./SiteDashboard.styles"

import SiteHome from "../../components/siteBuilder/SiteHome/SiteHome"
import SiteDesign from "../../components/siteBuilder/SiteDesign/SiteDesign"
import SectionsManager from "../../components/siteBuilder/sections/SectionsManager/SectionsManager"
import ProductsTab from "../../components/siteBuilder/products/ProductsTab/ProductsTab"
import OrdersTab from "../../components/siteBuilder/orders/OrdersTab/OrdersTab"

const PlaceholderTab = ({ name }) => (
    <ComingSoon>
        <ComingSoonTitle>{name}</ComingSoonTitle>
        <ComingSoonSub>This section is coming soon.</ComingSoonSub>
    </ComingSoon>
)

export default function SiteDashboard() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [website, setWebsite] = useState(null)
    const [user, setUser] = useState(null)

    const activeTab = searchParams.get("tab") || "Home"

    const setActiveTab = (tab) => {
        setSearchParams({ tab }, { replace: true })
    }
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const token = localStorage.getItem("token")
        if (!token) { navigate("/"); return }

        const fetchData = async () => {
            try {

                const [siteRes, dashRes] = await Promise.all([
                    api.get(`/websites/${id}`),
                    api.get("/dashboard")
                ])

                setWebsite(siteRes.data.website)
                setUser(dashRes.data.user)

            } catch (err) {
                console.error("Dashboard fetch error:", err)
                // Only redirect on explicit auth or not-found errors
                // This prevents Vite HMR aborts from kicking the user out of the builder
                const status = err.response?.status
                if (status === 401 || status === 403 || status === 404) {
                    navigate("/dashboard")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [id])

    const handleWebsiteUpdate = (newConfig) => {
        setWebsite(prev => ({
            ...prev,
            config: newConfig
        }))
    }

    if (loading) {
        return <LoadingScreen>Loading...</LoadingScreen>
    }

    const renderMainContent = () => {
        let content;
        if (activeTab === "Design") {
            content = <SiteDesign key={website?._id} website={website} onUpdate={handleWebsiteUpdate} />
        } else if (activeTab === "Sections") {
            content = <SectionsManager website={website} onUpdate={handleWebsiteUpdate} />
        } else if (activeTab === "Products") {
            content = <ProductsTab website={website} onUpdate={handleWebsiteUpdate} />
        } else if (activeTab === "Orders") {
            content = <OrdersTab />
        } else if (activeTab === "Home") {
            content = <SiteHome website={website} user={user} />
        } else {
            content = <PlaceholderTab name={activeTab} />
        }

        return (
            <Content>
                <Main>
                    {content}
                </Main>
            </Content>
        )
    }

    return (
        <Layout>
            <WebsiteSidebar
                type={website?.type}
                storeName={website?.name}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            {renderMainContent()}
        </Layout>
    )
}
