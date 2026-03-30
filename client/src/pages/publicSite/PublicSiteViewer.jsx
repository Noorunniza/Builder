import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"
import SitePreview from "../../components/siteBuilder/preview/SitePreview/SitePreview"
import { LiveGlobal, FullScreenWrapper, Center, Spinner, Title, Sub } from "./PublicSiteViewer.styles"

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
                persistOrders
            />
        </FullScreenWrapper>
    )

}
