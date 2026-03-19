import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"

import UserSidebar from "../../components/dashboard/UserSidebar/UserSidebar"
import DashboardLayout from "../../components/layouts/DashboardLayout/DashboardLayout"

import Card from "../../components/ui/Card/Card"
import Button from "../../components/ui/ActionButton/ActionButton"

import {
    Wrapper,
    SectionTitle,
    CardsRow,
    Actions,
    WebsiteList,
    WebsiteRow,
    SiteName,
    SiteType,
    EmptyState
} from "./Dashboard.styles"

export default function Dashboard() {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [websites, setWebsites] = useState([])

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/")
            return
        }

        const fetchData = async () => {

            try {

                const res = await api.get(
                    "/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setUser(res.data.user)
                setWebsites(res.data.websites || res.data.stats?.websiteList || [])

            } catch (err) {
                console.log(err)
            }

        }

        fetchData()

    }, [])

    return (

        <DashboardLayout
            SidebarComponent={UserSidebar}
            user={user}
        >

            <Wrapper>

                {/*  Stats Cards */}

                <SectionTitle>Overview</SectionTitle>

                <CardsRow>
                    <Card
                        title="Total Websites"
                        value={websites?.length || 0}
                    />

                    <Card
                        title="Current Plan"
                        value={user?.plan ?? "Free"}
                    />
                </CardsRow>

                {/*  Actions */}

                <SectionTitle>Quick Actions</SectionTitle>

                <Actions>

                    <Button onClick={() => navigate("/create")}>
                        + Create Website
                    </Button>

                    <Button onClick={() => navigate("/ai-builder")}>
                        ✦ Generate With AI
                    </Button>

                </Actions>

                {/*  Website List */}

                <WebsiteList>

                    <h3>🌐 My Websites</h3>

                    {(!websites || websites.length === 0) && (
                        <EmptyState>
                            <span className="icon">🚀</span>
                            <p>No websites yet — create your first one above!</p>
                        </EmptyState>
                    )}

                    {websites?.map(site => (

                        <WebsiteRow key={site._id}>

                            <div>
                                <SiteName>{site.name}</SiteName>
                                <SiteType>{site.type}</SiteType>
                            </div>

                            <Button
                                onClick={() =>
                                    navigate(`/dashboard/site/${site._id}`)
                                }
                            >
                                Manage →
                            </Button>

                        </WebsiteRow>

                    ))}

                </WebsiteList>

            </Wrapper>

        </DashboardLayout>

    )

}
