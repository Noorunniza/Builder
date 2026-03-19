import React, { useState } from "react"
import { Copy, Check, ExternalLink, Globe, Lock } from "lucide-react"
import api from "../../../services/api"

import {
    Page,
    Greeting,
    StoreId,
    SectionTitle,
    UrlBox,
    UrlInfo,
    UrlLabel,
    UrlLink,
    CopyButton,
    CardsRow,
    StatCard,
    CardIcon,
    CardLabel,
    CardValue,
    CardSub,
    ButtonGroup,
    PublishButton,
    StatusBadge
} from "./SiteHome.styles"

export default function SiteHome({ website, user }) {

    const [copied, setCopied] = useState(false)
    const [publishing, setPublishing] = useState(false)
    const [isLive, setIsLive] = useState(website?.published || false)

    // Use subdomain if present, otherwise fall back gracefully
    const subdomain = website?.subdomain || website?.name?.toLowerCase().replace(/\s+/g, "-")
    const storeUrl = `/live/${subdomain}`
    const fullUrl = `${window.location.origin}/live/${subdomain}`

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handlePublish = async () => {
        setPublishing(true)
        try {
            const res = await api.put(`/websites/publish/${website._id}`)
            setIsLive(res.data.published)
        } catch (err) {
            console.error("Publish error:", err)
        } finally {
            setPublishing(false)
        }
    }

    return (

        <Page>

            <Greeting>Hi, {user?.email?.split("@")[0]} 👋</Greeting>

            <StoreId>Store ID: {website?._id}</StoreId>

            {/* URL Section */}
            <SectionTitle>
                Your Store URL
                <StatusBadge $live={isLive}>
                    {isLive ? "Live" : "Draft"}
                </StatusBadge>
            </SectionTitle>

            <UrlBox>

                <UrlInfo>
                    <UrlLabel>Live Store Link</UrlLabel>
                    <UrlLink href={storeUrl} target="_blank" rel="noreferrer">
                        {fullUrl}
                    </UrlLink>
                </UrlInfo>

                <ButtonGroup>

                    <CopyButton onClick={handleCopy}>
                        {copied
                            ? <><Check size={14} /> Copied!</>
                            : <><Copy size={14} /> Copy URL</>
                        }
                    </CopyButton>

                    <CopyButton
                        as="a"
                        href={storeUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <ExternalLink size={14} /> Visit
                    </CopyButton>

                </ButtonGroup>

            </UrlBox>

            {/* Publish Section */}
            <SectionTitle>Publish Settings</SectionTitle>

            <PublishButton
                $live={isLive}
                onClick={handlePublish}
                disabled={publishing}
            >
                {publishing
                    ? "Saving…"
                    : isLive
                        ? <><Lock size={15} /> Set to Draft</>
                        : <><Globe size={15} /> Publish Website</>
                }
            </PublishButton>

            {/* Stats Cards */}
            <SectionTitle style={{ marginTop: "40px" }}>Analytics Overview</SectionTitle>

            <CardsRow>

                <StatCard>
                    <CardIcon>💰</CardIcon>
                    <CardLabel>Total Sales</CardLabel>
                    <CardValue>₹ 0.00</CardValue>
                </StatCard>

                <StatCard>
                    <CardIcon>🛒</CardIcon>
                    <CardLabel>Total Orders</CardLabel>
                    <CardValue>0</CardValue>
                </StatCard>

                <StatCard>
                    <CardIcon>👁️</CardIcon>
                    <CardLabel>User Visits</CardLabel>
                    <CardValue>0</CardValue>
                    <CardSub>Approximate value</CardSub>
                </StatCard>

            </CardsRow>

        </Page>

    )

}
