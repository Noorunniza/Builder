import React, { useEffect, useState } from "react"
import api from "../../../services/api"
import {
    Page, Greeting, StoreId, SectionTitle, UrlBox, UrlInfo, UrlLabel, UrlLink, CopyButton, ButtonGroup,
    PublishButton, StatusBadge, CheckIcon, CopyIcon, VisitIcon, DraftIcon, LiveIcon
} from "./SiteHome.styles"
import SiteHomeStats from "./SiteHomeStats"

export default function SiteHome({ website, user }) {
    const [copied, setCopied] = useState(false)
    const [publishing, setPublishing] = useState(false)
    const [isLive, setIsLive] = useState(website?.published || false)
    const [analytics, setAnalytics] = useState(null)
    const subdomain = website?.subdomain || website?.name?.toLowerCase().replace(/\s+/g, "-")
    const storeUrl = `/live/${subdomain}`
    const fullUrl = `${window.location.origin}/live/${subdomain}`

    useEffect(() => {
        if (!website?._id) return
        api.get(`/websites/${website._id}/analytics`).then(res => setAnalytics(res.data?.summary || null)).catch(() => {})
    }, [website?._id])

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
            <Greeting>Hi, {user?.email?.split("@")[0]}</Greeting>
            <StoreId>Store ID: {website?._id}</StoreId>
            <SectionTitle>Your Store URL <StatusBadge $live={isLive}>{isLive ? "Live" : "Draft"}</StatusBadge></SectionTitle>
            <UrlBox>
                <UrlInfo>
                    <UrlLabel>Live Store Link</UrlLabel>
                    <UrlLink href={storeUrl} target="_blank" rel="noreferrer">{fullUrl}</UrlLink>
                </UrlInfo>
                <ButtonGroup>
                    <CopyButton onClick={handleCopy}>{copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy URL</>}</CopyButton>
                    <CopyButton as="a" href={storeUrl} target="_blank" rel="noreferrer"><VisitIcon /> Visit</CopyButton>
                </ButtonGroup>
            </UrlBox>
            <SectionTitle>Publish Settings</SectionTitle>
            <PublishButton $live={isLive} onClick={handlePublish} disabled={publishing}>
                {publishing ? "Saving..." : isLive ? <><DraftIcon /> Set to Draft</> : <><LiveIcon /> Publish Website</>}
            </PublishButton>
            <SectionTitle $marginTop="40px">Analytics Overview</SectionTitle>
            <SiteHomeStats analytics={analytics} />
        </Page>
    )
}
