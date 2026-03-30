import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"
import UserSidebar from "../../components/dashboard/UserSidebar/UserSidebar"
import DashboardLayout from "../../components/layouts/DashboardLayout/DashboardLayout"
import BillingPage from "../../components/dashboard/BillingPage/BillingPage"
import DashboardHome from "./DashboardHome"

export default function Dashboard() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [websites, setWebsites] = useState([])
    const [activeTab, setActiveTab] = useState("Dashboard")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return navigate("/")

        api.get("/dashboard", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setUser(res.data.user)
                setWebsites(res.data.websites || res.data.stats?.websiteList || [])
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <DashboardLayout SidebarComponent={UserSidebar} user={user} activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === "Billing" ? <BillingPage user={user} /> : <DashboardHome user={user} websites={websites} />}
        </DashboardLayout>
    )
}
