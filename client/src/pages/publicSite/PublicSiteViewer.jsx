import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"
import SitePreview from "../../components/siteBuilder/preview/SitePreview/SitePreview"
import styled, { createGlobalStyle } from "styled-components"

// ── Reset any dashboard global styles so the live site looks clean ──
const LiveGlobal = createGlobalStyle`
    body { margin: 0; padding: 0; background: #fff; }
`

const FullScreenWrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    background: white;
    display: flex;
    flex-direction: column;
`

const Center = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    font-family: 'Inter', sans-serif;
    gap: 16px;
`

const Spinner = styled.div`
    width: 44px;
    height: 44px;
    border: 4px solid #e2e8f0;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    @keyframes spin { to { transform: rotate(360deg); } }
`

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
`

const Sub = styled.p`
    font-size: 0.95rem;
    color: #64748b;
    margin: 0;
`

export default function PublicSiteViewer() {

    const { subdomain } = useParams()

    const [website, setWebsite] = useState(null)
    const [status, setStatus] = useState("loading") // "loading" | "notfound" | "notlive" | "ready"

    useEffect(() => {

        const fetchWebsite = async () => {

            try {
                const res = await api.get(`/websites/subdomain/${subdomain}`)
                setWebsite(res.data.website)
                setStatus("ready")
            } catch (err) {
                const code = err.response?.status
                if (code === 403) {
                    setStatus("notlive")
                } else {
                    setStatus("notfound")
                }
            }

        }

        fetchWebsite()

    }, [subdomain])

    if (status === "loading") {
        return (
            <Center>
                <LiveGlobal />
                <Spinner />
                <Sub>Loading store…</Sub>
            </Center>
        )
    }

    if (status === "notlive") {
        return (
            <Center>
                <LiveGlobal />
                <Title>🚧 Coming Soon</Title>
                <Sub>This store hasn't been published yet.</Sub>
            </Center>
        )
    }

    if (status === "notfound") {
        return (
            <Center>
                <LiveGlobal />
                <Title>404 — Store Not Found</Title>
                <Sub>We couldn't find a store at <strong>{subdomain}.builder.site</strong>.</Sub>
            </Center>
        )
    }

    return (
        <FullScreenWrapper>
            <LiveGlobal />
            <SitePreview
                config={website.config}
                website={website}
                device="desktop"
            />
        </FullScreenWrapper>
    )

}
