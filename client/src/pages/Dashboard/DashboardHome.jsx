import React from "react"
import { useNavigate } from "react-router-dom"
import Card from "../../components/ui/Card/Card"
import Button from "../../components/ui/ActionButton/ActionButton"
import {
    Wrapper, SectionTitle, CardsRow, Actions, WebsiteList, WebsiteRow, SiteName, SiteType, EmptyState
} from "./Dashboard.styles"

export default function DashboardHome({ user, websites }) {
    const navigate = useNavigate()

    return (
        <Wrapper>
            <SectionTitle>Overview</SectionTitle>
            <CardsRow>
                <Card title="Total Websites" value={websites?.length || 0} />
                <Card title="Current Plan" value={user?.plan ?? "Free"} />
            </CardsRow>

            <SectionTitle>Quick Actions</SectionTitle>
            <Actions>
                <Button onClick={() => navigate("/create")}>+ Create Website</Button>
                <Button onClick={() => navigate("/ai-builder")}>Generate With AI</Button>
            </Actions>

            <WebsiteList>
                <h3>My Websites</h3>
                {(!websites || websites.length === 0) && <EmptyState><span className="icon">New</span><p>No websites yet - create your first one above!</p></EmptyState>}
                {websites?.map(site => (
                    <WebsiteRow key={site._id}>
                        <div><SiteName>{site.name}</SiteName><SiteType>{site.type}</SiteType></div>
                        <Button onClick={() => navigate(`/dashboard/site/${site._id}`)}>Manage</Button>
                    </WebsiteRow>
                ))}
            </WebsiteList>
        </Wrapper>
    )
}
